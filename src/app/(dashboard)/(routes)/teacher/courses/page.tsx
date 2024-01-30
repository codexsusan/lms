import { auth } from "@clerk/nextjs";
import { Course } from "@prisma/client";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const Courses = async () => {
    const { userId } = auth();
    if (!userId) return redirect("/");

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
          <DataTable columns={columns} data={courses} />
          {/* <Link href={"/teacher/create"}>
                <Button>
                    New Course
                </Button>
            </Link> */}
        </div>
    );
};

export default Courses;
