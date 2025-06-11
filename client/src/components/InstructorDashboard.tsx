import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InstructorResponse } from "@/lib/apiRoutes";
import { DollarSign, Users } from "lucide-react";

export interface InstructorDashboardProps {
  instructor: InstructorResponse;
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  instructor,
}) => {
  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: instructor.students.length || 0,
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: instructor.revenue || 0,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {config.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.label}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instructor.students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {student.course}
                    </TableCell>
                    <TableCell>{student.student.username}</TableCell>
                    <TableCell>{student.student.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDashboard;
