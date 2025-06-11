import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  CourseResponse,
  deleteFromCloudinary,
  getSignature,
  LectureResponse,
  uploadToCloudinary,
} from "@/lib/apiRoutes";
import { Upload } from "lucide-react";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { toast } from "react-toastify";
import useDashboardStore from "@/stores/useDashboardStore";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";

interface CourseCurriculumProps {
  editingCourse?: CourseResponse;
}

interface CourseCurriculumLectures {
  curriculum: LectureResponse[];
}

const CourseCurriculum: FC<CourseCurriculumProps> = ({ editingCourse }) => {
  const { setCurriculumFormData, curriculumFormData } = useDashboardStore();

  const [courseCurriculumLectures, setCourseCurriculumLectures] =
    useState<CourseCurriculumLectures>({
      curriculum: editingCourse?.curriculum || curriculumFormData,
    });

  useEffect(() => {
    if (editingCourse?.curriculum) {
      setCourseCurriculumLectures({
        curriculum: editingCourse.curriculum,
      });
      setCurriculumFormData(editingCourse.curriculum);
    }
  }, [editingCourse, setCurriculumFormData]);

  useEffect(() => {
    // Update global store when local state changes
    setCurriculumFormData(courseCurriculumLectures.curriculum);
  }, [courseCurriculumLectures.curriculum, setCurriculumFormData]);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const signature = await getSignature();
      return uploadToCloudinary(file, signature);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFromCloudinary,
  });

  const bulkUploadInputRef = useRef<HTMLInputElement>(null);
  const singleUploadInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 500 * 1024 * 1024;

  const handleSingleLectureUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Max size is 100MB");
      return;
    }

    try {
      const result = await uploadMutation.mutateAsync(file);

      setCourseCurriculumLectures((prev) => ({
        ...prev,
        curriculum: [
          ...prev.curriculum,
          {
            title: "",
            url: result.secure_url,
            publicId: result.public_id,
            freePreview: false,
          },
        ],
      }));
    } catch (error) {
      toast.error("Failed to upload video");
      console.error(error);
    }
  };

  const handleMediaBulkUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File ${file.name} is too large. Max size is 100MB`);
        continue;
      }

      try {
        const result = await uploadMutation.mutateAsync(file);

        setCourseCurriculumLectures((prev) => ({
          ...prev,
          curriculum: [
            ...prev.curriculum,
            {
              title: file.name.split(".")[0], // Use filename as initial title
              url: result.secure_url,
              publicId: result.public_id,
              freePreview: false,
            },
          ],
        }));
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
        console.error(error);
      }
    }
  };

  const handleAddLecture = () => {
    if (singleUploadInputRef.current) {
      singleUploadInputRef.current.click();
    }
  };

  const handleReplaceVideo = async (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";

    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Max size is 100MB");
        return;
      }

      try {
        // Delete old video first if we have a publicId
        const oldPublicId = courseCurriculumLectures.curriculum[index].publicId;
        if (oldPublicId) {
          await deleteMutation.mutateAsync(oldPublicId);
        }

        // Upload new video
        const result = await uploadMutation.mutateAsync(file);

        setCourseCurriculumLectures((prev) => {
          const newCurriculum = [...prev.curriculum];
          newCurriculum[index] = {
            ...newCurriculum[index],
            url: result.secure_url,
            publicId: result.public_id,
          };
          return { ...prev, curriculum: newCurriculum };
        });

        toast.success("Video replaced successfully");
      } catch (error) {
        toast.error("Failed to replace video");
        console.error(error);
      }
    };

    input.click();
  };

  const handleDeleteLecture = async (index: number) => {
    const lecture = courseCurriculumLectures.curriculum[index];

    try {
      // Delete from Cloudinary if we have a publicId
      if (lecture.publicId) {
        await deleteMutation.mutateAsync(lecture.publicId);
      }

      setCourseCurriculumLectures((prev) => ({
        ...prev,
        curriculum: prev.curriculum.filter((_, i) => i !== index),
      }));

      toast.success("Lecture deleted successfully");
    } catch (error) {
      toast.error("Failed to delete lecture");
      console.error(error);
    }
  };

  const handleTitleChange = (index: number, title: string) => {
    setCourseCurriculumLectures((prev) => {
      const newCurriculum = [...prev.curriculum];
      newCurriculum[index] = {
        ...newCurriculum[index],
        title,
      };
      return { ...prev, curriculum: newCurriculum };
    });
  };

  const handleFreePreviewChange = (value: boolean, index: number) => {
    setCourseCurriculumLectures((prev) => {
      const newCurriculum = [...prev.curriculum];
      newCurriculum[index] = {
        ...newCurriculum[index],
        freePreview: value,
      };
      return { ...prev, curriculum: newCurriculum };
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input
            type="file"
            ref={bulkUploadInputRef}
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
            onChange={handleMediaBulkUpload}
          />
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => bulkUploadInputRef.current?.click()}
          >
            <Upload className="w-4 h-5 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Input
          type="file"
          ref={singleUploadInputRef}
          accept="video/*"
          className="hidden"
          onChange={handleSingleLectureUpload}
        />
        <Button onClick={handleAddLecture} disabled={uploadMutation.isPending}>
          {uploadMutation.isPending ? (
            <div className="flex justify-center items-center">
              <Loader />
              Uploading...
            </div>
          ) : (
            "Add Lecture"
          )}
        </Button>{" "}
        <div className="mt-4 space-y-4">
          {courseCurriculumLectures.curriculum.map((lecture, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  value={lecture.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={lecture.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                {lecture.url ? (
                  <div className="flex gap-3">
                    <VideoPlayer
                      url={lecture.url}
                      width="450px"
                      height="200px"
                    />
                    <Button onClick={() => handleReplaceVideo(index)}>
                      Replace Video
                    </Button>
                    <Button
                      onClick={() => handleDeleteLecture(index)}
                      className="bg-red-900"
                    >
                      Delete Lecture
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
