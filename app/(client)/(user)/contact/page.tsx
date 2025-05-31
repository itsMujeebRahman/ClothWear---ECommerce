import React from "react";
import Container from "@/components/Container";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <Container className="max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-bold text-3xl mb-6">Contact Us</h1>
      <p className="mb-6">
        We would lik to hear from you please fill out the form below we will
        gett back to you as soon as possible
      </p>
      <form className="space-y-4">
        <div className="space-y-0.5">
          <label htmlFor="name">Name</label>
          <Input
            className=" rounded-md w-full px-4 py-2 border border-gray-300"
            type="text"
            name="name"
            required
          />
        </div>
        <div className="space-y-0.5">
          <label htmlFor="Email">Email</label>
          <Input
            className=" rounded-md w-full px-4 py-2 border border-gray-300"
            type="text"
            name="email"
            required
          />
        </div>
        <div className="space-y-0.5">
          <label htmlFor="Message">Message</label>
          <Textarea
            id="message"
            name="message"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none h-[15vh]"
            required
          />
        </div>
        <Button className="bg-black/80 txt-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-black hoverEffect">
          Send Message
        </Button>
      </form>
    </Container>
  );
};

export default ContactPage;
