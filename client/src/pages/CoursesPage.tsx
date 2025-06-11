import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { getCourses } from "@/lib/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDownIcon } from "lucide-react";
import { categories, languages, levels, sortOptions } from "@/types/Categories";
import { Skeleton } from "@/components/ui/skeleton";
import ListCourseCard from "@/components/ListCourseCard";
import { useState } from "react";

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryString = searchParams.toString();
  const url = queryString ? `?${queryString}` : "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleFilterChange = (
    value: string,
    type: "category" | "language" | "level",
    checked: boolean
  ) => {
    let currentSelection: string[];
    let setSelection: (value: string[]) => void;

    switch (type) {
      case "category":
        currentSelection = selectedCategories;
        setSelection = setSelectedCategories;
        break;
      case "language":
        currentSelection = selectedLanguages;
        setSelection = setSelectedLanguages;
        break;
      case "level":
        currentSelection = selectedLevels;
        setSelection = setSelectedLevels;
        break;
    }

    const newSelection = checked
      ? [...currentSelection, value]
      : currentSelection.filter((item) => item !== value);

    setSelection(newSelection);

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (newSelection.length > 0) {
      newParams.set(type, newSelection.join(","));
    } else {
      newParams.delete(type);
    }
    setSearchParams(newParams);
  };

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses", queryString],
    queryFn: () => getCourses(url),
  });

  const filterOptions = [
    {
      label: "Category",
      options: categories,
    },
    {
      label: "Language",
      options: languages,
    },
    {
      label: "Level",
      options: levels,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div>
            {filterOptions.map((filterItem) => (
              <div className="p-4 border-b" key={filterItem.label}>
                <h3 className="font-bold mb-3">{filterItem.label}</h3>
                {filterItem.options.map((option) => (
                  <div className="grid gap-2 mt-2" key={option.value}>
                    <Label className="flex font-medium items-center gap-3">
                      <Checkbox
                        value={option.value}
                        checked={
                          filterItem.label === "Category"
                            ? selectedCategories.includes(option.value)
                            : filterItem.label === "Language"
                            ? selectedLanguages.includes(option.value)
                            : selectedLevels.includes(option.value)
                        }
                        onCheckedChange={(checked) =>
                          handleFilterChange(
                            option.value,
                            filterItem.label.toLowerCase() as
                              | "category"
                              | "language"
                              | "level",
                            checked as boolean
                          )
                        }
                      />
                      {option.name}
                    </Label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {courses?.length} Results
            </span>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <Skeleton />
            ) : courses && courses.length > 0 ? (
              courses.map((course) => (
                <ListCourseCard key={course._id} course={course} />
              ))
            ) : (
              <h1 className="font-extrabold text-3xl">No Results Found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursesPage;
