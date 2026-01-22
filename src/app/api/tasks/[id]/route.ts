import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth0 } from "@/lib/auth0";

// PATCH /api/tasks/[id]
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Next.js 15+ requires awaiting params
        const { id } = await params;

        const session = await auth0.getSession();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const result = await prisma.task.updateMany({
            where: {
                id,
                userId: session.user.sub,
            },
            data: body,
        });

        if (result.count === 0) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        const task = await prisma.task.findUnique({
            where: { id },
        });

        return NextResponse.json(task);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to update task" },
            { status: 500 }
        );
    }
}

// DELETE /api/tasks/[id]
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Next.js 15+ requires awaiting params
        const { id } = await params;

        const session = await auth0.getSession();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const result = await prisma.task.deleteMany({
            where: {
                id,
                userId: session.user.sub,
            },
        });

        if (result.count === 0) {
            return NextResponse.json(
                { error: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to delete task" },
            { status: 500 }
        );
    }
}
