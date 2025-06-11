import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit } from "lucide-react";
import { FC } from "react";
import { InstructorDashboardProps } from "./InstructorDashboard";
import { useNavigate } from "react-router-dom";

const InstructorCourses: FC<InstructorDashboardProps> = ({ instructor }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button
          onClick={() => navigate("/dashboard/create-course")}
          className="p-6 cursor-pointer"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Enrollees</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructor.courses && instructor.courses.length > 0
                ? instructor.courses.map((course) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.enrollees?.length || 0}</TableCell>
                      <TableCell>
                        ${course?.enrollees?.length * course?.price || 0}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/dashboard/create-course/${course?._id}`);
                          }}
                          className="cursor-pointer"
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                        >
                          <Delete className="h-6 w-6 " />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
