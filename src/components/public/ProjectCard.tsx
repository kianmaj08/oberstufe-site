import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Project } from "@/lib/types"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="block">
      <div className="w-full bg-[#1A1A1A] border border-neutral-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-600 transition-all">
        <div className="flex flex-col sm:flex-row gap-4 p-6">
          {/* Vorschaubild */}
          {project.image_url && (
            <div className="flex-shrink-0">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full sm:w-40 h-40 object-cover rounded-md"
              />
            </div>
          )}

          {/* Projektinformationen */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Projekttitel */}
            <h3 className="text-xl font-semibold text-neutral-100">
              {project.title}
            </h3>

            {/* Beschreibung */}
            <p className="text-sm text-neutral-400 line-clamp-3">
              {project.description}
            </p>

            {/* Mitglieder und Tags */}
            <div className="flex items-end justify-between mt-auto gap-4">
              {project.members && project.members.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500">
                    Ein Projekt von:
                  </span>
                  <div className="flex -space-x-2">
                    {project.members.map((member) => (
                      <Avatar key={member.id} className="size-8 border-2 border-[#1A1A1A]">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-xs bg-neutral-700 text-neutral-300">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-end">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-neutral-700 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
