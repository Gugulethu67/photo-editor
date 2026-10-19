"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "./project-card";

export function ProjectGrid({ projects }) {
  const router = useRouter();

  const handleEditProject = (projectId) => {
    router.push(`/editor/${projectId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project, index) => (
        <div
          key={project._id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(index, 12) * 60}ms` }}
        >
          <ProjectCard
            project={project}
            onEdit={() => handleEditProject(project._id)}
          />
        </div>
      ))}
    </div>
  );
}
