"use client";

import {
  Database,
  Server,
  Cpu,
  BrainCircuit,
  Code2,
  Layers3,
} from "lucide-react";

const technologies = [
  {
    name: "Next.js",
    description: "Modern React Framework",
    icon: Layers3,
    color: "from-black to-zinc-700",
  },
  {
    name: "TypeScript",
    description: "Type Safe Development",
    icon: Code2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Express.js",
    description: "REST API Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Prisma ORM",
    description: "Database ORM",
    icon: Database,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "PostgreSQL",
    description: "Relational Database",
    icon: Cpu,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Gemini AI",
    description: "Invoice Intelligence",
    icon: BrainCircuit,
    color: "from-cyan-500 to-blue-500",
  },
];

export default function TechStack() {
  return (
    <section
      id="tech"
      className="bg-zinc-950 py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300">
            Modern Tech Stack
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Built With Modern Technologies
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            RestaurantOS is built using a scalable and production-ready
            technology stack for speed, reliability and AI automation.
          </p>

        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-white/10"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tech.color}`}
                >
                  <Icon className="text-white" size={30} />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  {tech.name}
                </h3>

                <p className="mt-3 text-gray-400">
                  {tech.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}