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
  subtitle: string;
  description: string;
  cover: string;
  category: string;
  level: string;
  courseLanguage: string;
  courseWelcomeMessage: string;
  courseObjectives: string[];
  courseRequirements: string[];
  courseWhoIsThisFor: string[];
  price: number;
  previousPrice?: number;
}

const CourseLanding: FC<CourseLandingProps> = ({ editingCourse }) => {
  const { setCourseLandingFormData, courseLandingFormData } =
    useDashboardStore();

  const [formData, setFormData] = useState<FormDataProps>(
    editingCourse || courseLandingFormData
  );

  useEffect(() => {
    if (editingCourse) {
      setFormData(editingCourse);
    }
  }, [editingCourse]);

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
          <div className="flex flex-col gap-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Course title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            {/* Subtitle */}

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                placeholder="Course subtitle"
                type="text"
                value={formData.subtitle}
                onChange={handleInputChange}
              />
            </div>

            {/* Category */}
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

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Course description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            {/* Level */}
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

            {/* Language */}
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
                  <SelectValue placeholder="Select the course spoken language" />
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

            {/* Welcome Message */}
            <div className="space-y-2">
              <Label htmlFor="welcomeMessage">Course Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                name="courseWelcomeMessage"
                placeholder="Enter a course welcome message to be sent to the user as a welcome note"
                value={formData.courseWelcomeMessage}
                onChange={handleInputChange}
              />
            </div>

            {/* Objectives */}
            <div className="space-y-2">
              <Label>Course Objectives</Label>
              {Array.isArray(formData.courseObjectives) &&
                formData.courseObjectives.map((objective, idx) => (
                  <div
                    key={`objective-${idx}`}
                    className="flex items-center gap-2 mb-2"
                  >
                    <Input
                      name={`courseObjectives-${idx}`}
                      placeholder={`Objective ${idx + 1}`}
                      value={objective}
                      onChange={(e) => {
                        const updated = [...formData.courseObjectives];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, courseObjectives: updated });
                      }}
                    />
                    {idx !== 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const updated = formData.courseObjectives.filter(
                            (_, i) => i !== idx
                          );
                          setFormData({
                            ...formData,
                            courseObjectives: updated,
                          });
                        }}
                        aria-label="Remove objective"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    ...formData,
                    courseObjectives: [
                      ...(Array.isArray(formData.courseObjectives)
                        ? formData.courseObjectives
                        : []),
                      "",
                    ],
                  })
                }
              >
                Add Objective
              </Button>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label>Course Requirements</Label>
              {Array.isArray(formData.courseRequirements) &&
                formData.courseRequirements.map((requirement, idx) => (
                  <div
                    key={`requirement-${idx}`}
                    className="flex items-center gap-2 mb-2"
                  >
                    <Input
                      name={`courseRequirements-${idx}`}
                      placeholder={`Requirement ${idx + 1}`}
                      value={requirement}
                      onChange={(e) => {
                        const updated = [...formData.courseRequirements];
                        updated[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          courseRequirements: updated,
                        });
                      }}
                    />
                    {idx !== 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const updated = formData.courseRequirements.filter(
                            (_, i) => i !== idx
                          );
                          setFormData({
                            ...formData,
                            courseRequirements: updated,
                          });
                        }}
                        aria-label="Remove requirement"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    ...formData,
                    courseRequirements: [
                      ...(Array.isArray(formData.courseRequirements)
                        ? formData.courseRequirements
                        : []),
                      "",
                    ],
                  })
                }
              >
                Add Requirement
              </Button>
            </div>

            {/* Who is this course for */}
            <div className="space-y-2">
              <Label>Who is this course for?</Label>
              {Array.isArray(formData.courseWhoIsThisFor) &&
                formData.courseWhoIsThisFor.map((condition, idx) => (
                  <div
                    key={`condition-${idx}`}
                    className="flex items-center gap-2 mb-2"
                  >
                    <Input
                      name={`courseConditions-${idx}`}
                      placeholder={`Condition ${idx + 1}`}
                      value={condition}
                      onChange={(e) => {
                        const updated = [...formData.courseWhoIsThisFor];
                        updated[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          courseWhoIsThisFor: updated,
                        });
                      }}
                    />
                    {idx !== 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const updated = formData.courseWhoIsThisFor.filter(
                            (_, i) => i !== idx
                          );
                          setFormData({
                            ...formData,
                            courseWhoIsThisFor: updated,
                          });
                        }}
                        aria-label="Remove condition"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    ...formData,
                    courseWhoIsThisFor: [
                      ...(Array.isArray(formData.courseWhoIsThisFor)
                        ? formData.courseWhoIsThisFor
                        : []),
                      "",
                    ],
                  })
                }
              >
                Add Condition
              </Button>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Course Price (In $USD)</Label>
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

            {/* Previous Price */}
            <div className="space-y-2">
              <Label htmlFor="previousPrice">
                Optional: Previous Price (Before Discount, In $USD)
              </Label>
              <Input
                id="previousPrice"
                name="previousPrice"
                placeholder="Optional: Add a previous price to be displayed as a discount"
                type="number"
                max={1000}
                min={0}
                value={formData.previousPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </CardContent>

      <div className="flex justify-end px-6">
        <Button
          className="text-sm tracking-wider font-bold px-8 cursor-pointer"
          onClick={() => setCourseLandingFormData(formData)}
        >
          Save Changes
        </Button>
      </div>
    </Card>
  );
};

export default CourseLanding;
