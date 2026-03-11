"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MainLayout } from "@/layouts";
import { Button, Container } from "@/components/ui";
import { getTeamMembers } from "@/lib/data";

export default function TeamMemberPage() {
  const params = useParams();
  const slug = params.slug as string;
  const members = getTeamMembers();
  const member = members.find(
    (m) => m.href.endsWith(`/team/${slug}`) || m.href.includes(`/${slug}`)
  );

  if (!member) {
    return (
      <MainLayout>
        <section className="relative bg-bg min-h-[50vh] flex items-center justify-center py-20">
          <Container>
            <div className="text-center">
              <h1 className="font-display text-2xl sm:text-4xl font-bold uppercase text-foreground mb-6">
                Team member not found
              </h1>
              <Button href="/about">Back to About</Button>
            </div>
          </Container>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section
        className="relative bg-surface pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32"
        aria-labelledby="team-member-heading"
      >
        <Container>
          <Link
            href="/about"
            className="text-label text-foreground-inverse/70 hover:text-foreground-inverse mb-8 inline-block transition-colors duration-200"
          >
            ← Back to About
          </Link>
          <div className="max-w-[40rem]">
            <div className="relative aspect-[427/500] w-full max-w-[24rem] overflow-hidden rounded-sm mb-8">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 24rem"
                priority
              />
            </div>
            <h1
              id="team-member-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-foreground-inverse"
            >
              {member.name}
            </h1>
            <p className="eyebrow-text text-foreground-inverse/80 mt-2">
              {member.title}
            </p>
            <div className="mt-10">
              <Button href="/connect" variant="primary">
                Get in touch
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
