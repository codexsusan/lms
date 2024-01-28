import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface Props {
  params: {
    courseId: string;
  };
}

export async function PATCH(req: Request, { params }: Props) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: { ...values },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[CourseId]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
