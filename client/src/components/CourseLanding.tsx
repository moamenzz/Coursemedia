import { CourseResponse } from "@/lib/apiRoutes";
import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useDashboardStore from "@/stores/useDashboardStore";
import { Button } from "./ui/button";

interface CourseLandingProps {
  editingCourse?: CourseResponse;
}

export interface FormDataProps {
  title: string;
  description: string;
  cover: string;
  category: string;
  level: string;
  courseLanguage: string;
  courseObjectives: string;
  courseRequirements: string;
  courseWelcomeMessage: string;
  price: number;
}

const CourseLanding: FC<CourseLandingProps> = ({ editingCourse }) => {
  const [formData, setFormData] = useState<FormDataProps>({
    title: editingCourse?.title || "",
    description: editingCourse?.description || "",
    cover: editingCourse?.cover || "",
    category: editingCourse?.category || "",
    level: editingCourse?.level || "",
    courseLanguage: editingCourse?.courseLanguage || "",
    courseObjectives: editingCourse?.courseObjectives || "",
    courseRequirements: editingCourse?.courseRequirements || "",
    courseWelcomeMessage: editingCourse?.courseWelcomeMessage || "",
    price: editingCourse?.price || 0,
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData({
        title: editingCourse.title,
        description: editingCourse.description,
        cover: editingCourse.cover,
        category: editingCourse.category,
        level: editingCourse.level,
        courseLanguage: editingCourse.courseLanguage,
        courseObjectives: editingCourse.courseObjectives,
        courseRequirements: editingCourse.courseRequirements,
        courseWelcomeMessage: editingCourse.courseWelcomeMessage,
        price: editingCourse.price,
      });
    }
  }, [editingCourse]);

  const { setCourseLandingFormData } = useDashboardStore();

  const categoryOptions = [
    { value: "webDevelopment", label: "Web Development" },
    { value: "dataScience", label: "Data Science" },
    { value: "machineLearning", label: "Machine Learning" },
    { value: " programmingLanguages", label: "Programming Languages" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "other", label: "Other" },
  ];

  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const courseLanguageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "russian", label: "Russian" },
    { value: "chinese", label: "Chinese" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Compress Image
        setFormData({
          ...formData,
          cover: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cover">Cover</Label>
            <Input
              className="hidden"
              type="file"
              accept="image/*"
              id="coverImage"
              onChange={handleCoverImage}
            />
            <label
              className="relative flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-primary/10 bg-black/5"
              htmlFor="coverImage"
            >
              {formData.cover ? (
                <img
                  src={formData.cover}
                  className="h-full w-full rounded-md object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div className="text-sm">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </div>
                  <div className="text-xs text-muted-foreground">
                    SVG, PNG, JPG or GIF
                  </div>
                </div>
              )}
            </label>
          </div>
          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    category: value,
                  })
                }
                value={formData.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((optionItem) => (
                    <SelectItem key={optionItem.value} value={optionItem.value}>
                      {optionItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    level: value,
                  })
                }
                value={formData.level}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select the course level of difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {levelOptions.map((optionItem) => (
                    <SelectItem key={optionItem.value} value={optionItem.value}>
                      {optionItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    courseLanguage: value,
                  })
                }
                value={formData.courseLanguage}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select course language" />
                </SelectTrigger>
                <SelectContent>
                  {courseLanguageOptions.map((optionItem) => (
                    <SelectItem key={optionItem.value} value={optionItem.value}>
                      {optionItem.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Course Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                name="courseWelcomeMessage"
                placeholder="Enter a course welcome message to be displayed when a customer buys the course for the first time"
                value={formData.courseWelcomeMessage}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="objectives">Course Objectives</Label>
              <Textarea
                id="objectives"
                name="courseObjectives"
                placeholder="Enter the objectives of this course and what the customer is going to learn"
                value={formData.courseObjectives}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Course Requirements</Label>
              <Textarea
                id="requirements"
                name="courseRequirements"
                placeholder="Enter the requirements required from the user to take this course"
                value={formData.courseRequirements}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (In $USD)</Label>
              <Input
                id="price"
                name="price"
                placeholder="Price"
                type="number"
                max={1000}
                min={0}
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseLanding;
