'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/components/ui/accordion'
import { Calendar, MapPin, ShieldCheck, Smartphone, Ticket, Users, XCircle, Quote, Send } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/components/ui/button'
import router from 'next/router'

type FAQItem = {
    id: string
    icon: React.ReactNode
    question: string
    answer: string
}

export default function FAQsThree() {
    const faqItems: FAQItem[] = [
        {
            id: 'item-1',
            icon: <Calendar className="h-5 w-5" />,
            question: 'How do I find events on CLIQ?',
            answer: 'You can browse events directly on the home page or use filters such as category, location, or date to discover events that match your interests.',
        },
        {
            id: 'item-2',
            icon: <Ticket className="h-5 w-5" />,
            question: 'What is a pass and how do I get one?',
            answer: 'A pass is your digital ticket to an event. Simply go to the event detail page and click "Reserve Pass". Your pass will be saved under "My Passes" and will include a QR code for entry.',
        },
        {
            id: 'item-3',
            icon: <Users className="h-5 w-5" />,
            question: 'Can I bring a guest to an event?',
            answer: 'Yes! When reserving a pass, you can add a guest name. The guest will be included in your pass reservation and visible to the event organizer.',
        },
        {
            id: 'item-4',
            icon: <MapPin className="h-5 w-5" />,
            question: 'How do I know where an event is located?',
            answer: 'Each event includes a location section with a Google Maps integration. You can tap the map to open directions in your maps app.',
        },
        {
            id: 'item-5',
            icon: <Smartphone className="h-5 w-5" />,
            question: 'How do I access my passes?',
            answer: 'All your reserved passes can be found in the "My Passes" page. Each pass contains event details, status, and a QR code for check-in at the event.',
        },
        {
            id: 'item-6',
            icon: <XCircle className="h-5 w-5" />,
            question: 'Can I cancel a pass?',
            answer: 'Yes. Simply go to "My Passes", select the pass you wish to cancel, and choose the cancel option. This frees up the spot for another attendee.',
        },
        {
            id: 'item-7',
            icon: <Send className="h-5 w-5" />,
            question: 'Are passes transferable?',
            answer: 'For most events, passes are linked to your account and cannot be transferred. However, some organizers may allow guest passes. Check the event details for specific rules.',
        },
    ]

    return (
        <section className="bg-muted dark:bg-background min-h-[calc(100vh-4rem)] flex items-start pt-20 pb-10">
            <div className="w-full max-w-5xl px-4 md:px-6 mx-auto">
                <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                    <div className="md:w-1/3">
                        <div className="top-20">
                            <Quote strokeWidth={0.75} className="h-24 w-24 p-0 m-0" />
                            <h2 className="mt-4 text-4xl font-semibold">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground mt-4">
                                Can't find what you're looking for?
                            </p>
                            <Button className="mt-4" onClick={() => router.push('/contact')}>Contact Us</Button>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-2">
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-6">
                                                {item.icon}
                                            </div>
                                            <span className="text-base">{item.question}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5">
                                        <div className="px-9">
                                            <p className="text-muted-foreground">{item.answer}</p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
