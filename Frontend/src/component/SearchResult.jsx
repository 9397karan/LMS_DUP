import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  const truncatedDescription = course.courseDesc
    ? course.courseDesc.length > 100
      ? `${course.courseDesc.slice(0, 100)}...`
      : course.courseDesc
    : "No description available";

  return (
    <div className="border-b border-gray-300 py-4 gap-4">
      <Link to={`/course-detail/${course._id}`} className="flex flex-col md:flex-row gap-4 w-full">
        <img
          src={course.coursePic?.url}
          alt="course-thumbnail"
          className="h-36 w-full md:w-66 md:h-40 object-cover rounded"
        />
        <div className="flex flex-col gap-2 w-full">
          <h1 className="font-bold text-lg md:text-xl">{course.courseName}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300"> {truncatedDescription}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Instructor: <span className="font-bold dark:text-gray-300">{course.creator}</span>{" "}
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
        <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
          <h1 className="font-bold text-lg md:text-xl">₹{course.coursePrice}</h1>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
