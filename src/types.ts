/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Booking {
  id: string;
  name: string;
  email: string;
  projectName: string;
  date: string;
  time: string;
  timezone: string;
  meetUrl: string;
  notes?: string;
  phone?: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
  calendarEventId?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
}

export interface EmailLog {
  id: string;
  bookingId: string;
  recipient: string;
  subject: string;
  body: string;
  sentAt: string;
  type: "confirmation" | "reminder";
}

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  techStack: string[];
}
