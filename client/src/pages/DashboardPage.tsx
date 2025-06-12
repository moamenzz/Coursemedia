import ErrorThrower from "@/components/ErrorThrower";
import Loader from "@/components/Loader";
import { getInstructor, InstructorResponse, logout } from "@/lib/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BarChart, Book, LogOut } from "lucide-react";
import useDashboardStore, { DashboardStore } from "@/stores/useDashboardStore";
import { toast } from "react-toastify";
import InstructorDashboard from "@/components/InstructorDashboard";
import InstructorCourses from "@/components/InstructorCourses";

interface MenuItemsProps {
  icon: any;
  label: string;
  value: string;
  component: React.ReactNode;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    data: instructor,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["instructor"],
    queryFn: getInstructor,
  });

  const { mutate: logoutMutation, error: logoutError } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/");
    },
    onError: () => {
      const errorMsg = logoutError?.message || "Failed to log out";
      toast.error(`Logout Failed: ${errorMsg}`);
    },
  });

  const { activeTab, setActiveTab } = useDashboardStore();

  const instructorFallback: InstructorResponse = {
    _id: "",
    user: "",
    students: [],
    courses: [],
    revenue: 0,
    createdAt: new Date(),
  };

  const menuItems: MenuItemsProps[] = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: (
        <InstructorDashboard
          instructor={instructor ? instructor : instructorFallback}
        />
      ),
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: (
        <InstructorCourses
          instructor={instructor ? instructor : instructorFallback}
        />
      ),
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div className="flex flex-col justify-center items-center">
      <ErrorThrower isError={isError} error={error} />
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Home
      </Link>
    </div>
  ) : (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className={`w-full justify-start mb-2 ${
                  menuItem.value === "logout" ? "text-red-500" : ""
                }`}
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "logout"
                    ? () => logoutMutation()
                    : () =>
                        setActiveTab(
                          menuItem.value as DashboardStore["activeTab"]
                        )
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={() => setActiveTab(activeTab)}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
