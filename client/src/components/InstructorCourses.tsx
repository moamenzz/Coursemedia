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
import { Delete, Edit, Star } from "lucide-react";
import { FC, useState } from "react";
import { InstructorDashboardProps } from "./InstructorDashboard";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { CourseResponse } from "@/lib/apiRoutes";

const InstructorCourses: FC<InstructorDashboardProps> = ({ instructor }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseResponse>();

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
                <TableHead>Reviews</TableHead>
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
                        $
                        {(course?.enrollees?.length as number) *
                          course?.price || 0}
                      </TableCell>
                      <TableCell>{course?.reviews?.length || 0}</TableCell>
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
                          onClick={() => {
                            navigate(`/dashboard/reviews/${course?._id}`);
                          }}
                          className="cursor-pointer"
                          variant="ghost"
                          size="sm"
                        >
                          <Star className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsOpen(true);
                          }}
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
      {selectedCourse && (
        <ConfirmationModal
          isOpen={isOpen}
          setIsOpen={(open) => {
            setIsOpen(open);
            if (!open) setSelectedCourse(undefined);
          }}
          course={selectedCourse}
        />
      )}
    </Card>
  );
};

export default InstructorCourses;
