"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <GraduationCap className="h-8 w-8 text-primary" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quyl
            </span>
          </div>

          <button
            className="block lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
            <Button
              asChild
              size="lg"
              className="w-full min-[400px]:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
            >
              <Link href="/login">Get Started Free</Link>
            </Button>
          </nav>

          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 border-b bg-background p-4 lg:hidden animate-in slide-in-from-top">
              <nav className="flex flex-col gap-4">
                <Link
                  href="#features"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Features
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Testimonials
                </Link>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <section className="container px-4 py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-8">
              <Badge className="w-fit" variant="secondary">
                100% Free Forever ✨
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
                  Teaching Made{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Simple
                  </span>
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Quyl is a free platform that helps teachers track students,
                  courses, and classes all in one place. Join thousands of
                  educators who&apos;ve simplified their teaching workflow.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full min-[400px]:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
                >
                  <Link href="/login">Get Started Free</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full min-[400px]:w-auto group"
                >
                  <Link href="https://github.com/Venu005/studentManagment">
                    <span className="mr-2">Watch Demo</span>
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r from-blue-600 to-purple-600"
                    />
                  ))}
                </div>
                <p>Join 10,000+ teachers already using Quyl</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-3xl -z-10" />
              <Image
                src="/hero.jpeg"
                alt="Dashboard Preview"
                className="rounded-xl border shadow-2xl transition-transform hover:scale-[1.01] cursor-pointer"
                width={550}
                height={550}
              />
            </div>
          </div>
        </section>

        <section
          className="container space-y-12 px-4 py-12 md:py-24 lg:py-32"
          id="features"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge variant="secondary">Features</Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Excel
                </span>
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Powerful tools to help you stay organized and focused on what
                matters most - teaching.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Student Management",
                description:
                  "Track attendance, grades, and progress for each student in your classes.",
              },
              {
                icon: BookOpen,
                title: "Course Planning",
                description:
                  "Create and organize course materials, assignments, and schedules.",
              },
              {
                icon: LayoutDashboard,
                title: "Smart Dashboard",
                description:
                  "Get insights and analytics about your classes at a glance.",
              },
            ].map((feature, i) => (
              <Card key={i} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-5" />
                <CardHeader>
                  <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section
          className="container px-4 py-12 md:py-24 lg:py-32 relative"
          id="testimonials"
        >
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge variant="secondary">Testimonials</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Loved by Educators
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                quote:
                  "Quyl has transformed how I manage my classes. It's intuitive and saves me hours every week.",
                author: "Sarah Johnson",
                role: "High School Teacher",
              },
              {
                quote:
                  "The best part? It's completely free! I couldn't believe such a powerful tool was available at no cost.",
                author: "Michael Chen",
                role: "University Professor",
              },
              {
                quote:
                  "The student tracking features are incredible. I can easily monitor progress and identify areas for improvement.",
                author: "Emma Williams",
                role: "Elementary Teacher",
              },
            ].map((testimonial, i) => (
              <Card key={i} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-lg">
                    &ldquo;{testimonial.quote}&ldquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container px-4 py-12 md:py-24 lg:py-32 ">
          <Card className="relative  overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
            <CardContent className="p-12 md:p-24">
              <div className="grid gap-6 lg:grid-cols-2 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Transform Your Teaching?
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <p className="text-lg">No credit card required</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <p className="text-lg">Quick 30-second setup</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <p className="text-lg">Free forever</p>
                    </div>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-3xl -z-10" />
                  <Image
                    src="/hero_1.jpeg"
                    alt="Dashboard Preview"
                    className="rounded-xl border shadow-2xl transition-transform hover:scale-[1.01] cursor-pointer"
                    width={400}
                    height={300}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quyl
            </span>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Quyl. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
