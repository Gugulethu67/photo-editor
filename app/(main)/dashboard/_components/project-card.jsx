import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function ProjectCard({ project, onEdit }) {
  const { mutate: deleteProject, isLoading } = useConvexMutation(
    api.project.deleteProject
  );

  const lastUpdated = formatDistanceToNow(new Date(project.updatedAt), {
    addSuffix: true,
  });

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete "${project.title}"? This action cannot be undone.`
    );

    if (confirmed) {
      try {
        await deleteProject({ projectId: project._id });
        toast.success("Project deleted successfully");
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <Card className="py-0 group relative bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10">
      {/* Thumbnail */}
      <div className="aspect-video bg-emerald-50 relative overflow-hidden">
        {project.thumbnailUrl && (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-emerald-950/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button variant="glass" size="sm" onClick={onEdit} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="glass"
            size="sm"
            onClick={handleDelete}
            className="gap-2 text-red-600 hover:text-red-700"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Project Info */}
      <CardContent className="pb-6">
        <h3 className="font-semibold text-slate-900 mb-1 truncate">
          {project.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Updated {lastUpdated}</span>
          <Badge
            variant="secondary"
            className="text-xs bg-emerald-50 text-slate-600"
          >
            {project.width} × {project.height}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}