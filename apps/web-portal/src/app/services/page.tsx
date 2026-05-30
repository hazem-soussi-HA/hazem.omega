"use client";

import { Card, Badge, Button } from "@/app/components/ui";
import { useState } from "react";
import { FileText, Send, Ticket, Download, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";

const services = [
  {
    id: "consulting",
    title: "Cloud Consulting",
    description: "Architecture review, migration planning, and optimization for cloud infrastructure.",
    price: "€150/h",
    features: ["Architecture Review", "Migration Planning", "Cost Optimization", "Security Audit"],
  },
  {
    id: "development",
    title: "Custom Development",
    description: "Full-stack development, API design, and DevOps automation.",
    price: "€200/h",
    features: ["Full-Stack Development", "API Design", "CI/CD Setup", "Documentation"],
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "Round-the-clock monitoring, incident response, and SLA guarantees.",
    price: "€500/mo",
    features: ["24/7 Monitoring", "Incident Response", "SLA Guarantee", "Monthly Reports"],
  },
];

const supportTickets = [
  { id: "TKT-001", subject: "Deployment failed on staging", status: "open", date: "2024-01-15", priority: "high" },
  { id: "TKT-002", subject: "API rate limiting questions", status: "resolved", date: "2024-01-14", priority: "low" },
  { id: "TKT-003", subject: "Certificate renewal", status: "in-progress", date: "2024-01-13", priority: "medium" },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<'booking' | 'tickets' | 'documents'>('booking');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Services</h1>
        <p className="text-muted">Book consultations, manage tickets, and exchange documents</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-border pb-2">
        {(['booking', 'tickets', 'documents'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-t-md transition-colors capitalize ${
              activeTab === tab ? "bg-accent/20 text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'booking' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="flex flex-col">
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted mb-4">{service.description}</p>
                  <p className="text-xl font-bold text-accent mb-4">{service.price}</p>
                  <ul className="space-y-1 mb-4">
                    {service.features.map((f) => (
                      <li key={f} className="text-xs text-muted flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-neon-green" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button size="sm">Book Now</Button>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <h3 className="font-semibold mb-4">Send a Message</h3>
            {submitted ? (
              <div className="text-neon-green flex items-center gap-2">
                <CheckCircle className="h-5 w-5" /> Message sent successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  required
                />
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send
                </Button>
              </form>
            )}
          </Card>
        </div>
      )}

      {activeTab === 'tickets' && (
        <Card>
          <h3 className="font-semibold mb-4">Support Tickets</h3>
          <div className="space-y-3">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between rounded-md border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{ticket.subject}</p>
                  <p className="text-xs text-muted">{ticket.id} · {ticket.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={ticket.priority === 'high' ? 'warning' : 'secondary'}>
                    {ticket.priority}
                  </Badge>
                  <Badge variant={ticket.status === 'open' ? 'destructive' : ticket.status === 'resolved' ? 'success' : 'warning'}>
                    {ticket.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card>
          <h3 className="font-semibold mb-4">Document Exchange</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-md border border-dashed border-border p-6 text-center">
              <Upload className="h-8 w-8 text-muted mx-auto" />
              <div>
                <p className="text-sm text-muted">Upload documents securely</p>
                <p className="text-xs text-muted">NDA, contracts, architecture docs</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted" />
                  <span className="text-sm">NDA_Template.pdf</span>
                </div>
                <button className="text-accent text-sm hover:underline">
                  <Download className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border p-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted" />
                  <span className="text-sm">Architecture_Diagram.png</span>
                </div>
                <button className="text-accent text-sm hover:underline">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
