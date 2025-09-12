"use client"

import { Mail, Phone, MapPin, Send, MailOpen } from "lucide-react"
import { Input } from "@/components/components/ui/input"
import { Textarea } from "@/components/components/ui/textarea"
import { Button } from "@/components/components/ui/button"
import { Card, CardContent } from "@/components/components/ui/card"

export default function ContactPage() {
  return (
    <div className="container py-4">
    <section className="bg-muted dark:bg-background min-h-[calc(100vh-4rem)] flex items-start pt-20 pb-10">
      <div className="w-full max-w-5xl px-4 md:px-6 mx-auto">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* Left side - Contact Info */}
          <div className="md:w-1/3 space-y-6">
            <Send strokeWidth={0.75} className="h-24 w-24 p-0 m-0" />
            <h2 className="text-4xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground">
              Have questions, feedback, or partnership inquiries? We’d love to hear from you.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>support@cliqapp.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>123 Event Street, Manchester, UK</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-2/3">
            <Card className="bg-background shadow-xs border">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" required />
                    <Input type="email" placeholder="Your Email" required />
                  </div>
                  <Input placeholder="Subject" required />
                  <Textarea placeholder="Your Message" rows={6} required />
                  <Button type="submit" className="flex items-center gap-2">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}