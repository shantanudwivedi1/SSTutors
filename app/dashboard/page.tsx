"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="container py-10">Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  const isStudent = session?.user.role === "STUDENT";
  const isTutor = session?.user.role === "TUTOR";

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Welcome back, {session?.user.name}! Manage your {isStudent ? "learning" : "tutoring"} journey here.
      </p>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {isStudent && <TabsTrigger value="bookings">My Bookings</TabsTrigger>}
          {isTutor && <TabsTrigger value="schedule">My Schedule</TabsTrigger>}
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isStudent ? "Upcoming Sessions" : "Today's Schedule"}
                </CardTitle>
                <CardDescription>
                  {isStudent
                    ? "Your next tutoring sessions"
                    : "Your tutoring sessions for today"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No upcoming sessions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {isStudent ? "Recent Activity" : "Recent Reviews"}
                </CardTitle>
                <CardDescription>
                  {isStudent
                    ? "Your recent learning activities"
                    : "Latest feedback from your students"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No recent activity</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {isStudent ? "Recommended Tutors" : "Statistics"}
                </CardTitle>
                <CardDescription>
                  {isStudent
                    ? "Tutors that match your learning needs"
                    : "Your tutoring performance"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isStudent ? (
                  <p className="text-muted-foreground">
                    Explore tutors to find your perfect match
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Sessions</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Rating</span>
                      <span className="font-medium">N/A</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion Rate</span>
                      <span className="font-medium">N/A</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {isStudent && (
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>
                  Manage your tutoring sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You have no bookings yet</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isTutor && (
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>My Schedule</CardTitle>
                <CardDescription>
                  Manage your availability and sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No scheduled sessions</p>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Name</h3>
                  <p>{session?.user.name || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{session?.user.email || "Not provided"}</p>
                </div>
                <div>
                  <h3 className="font-medium">Role</h3>
                  <p>{session?.user.role || "Not specified"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 