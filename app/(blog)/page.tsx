import Link from 'next/link';
import { groq } from 'next-sanity';
import { sanityFetch } from '@/sanity/lib/fetch';

// Self-contained GROQ query to prevent missing export errors from queries.ts
const allPostsQuery = groq`*[_type == "post"] | order(date desc) {
  _id,
  title,
  slug,
  excerpt,
  date,
  category
}`;

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  date?: string;
  category?: string;
}

export default async function HomePage() {
  const posts: Post[] = await sanityFetch({ query: allPostsQuery }).catch(() => []);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#171717] selection:bg-[#EEE8FF] selection:text-[#6C3BFF]">
      {/* Navigation Header */}
      <header className="border-b border-zinc-200/80 bg-[#FAFAFA]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-[#171717] hover:text-[#6C3BFF] transition-colors"
          >
            Unspoken Horizon<span className="text-[#6C3BFF]">.</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              By Abigael Osward Sanga
            </span>
            <Link href="/studio" className="btn-primary text-sm">
              Write Post
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEE8FF] text-[#6C3BFF] text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-[#6C3BFF]"></span>
          A Journal by Abigael Osward Sanga
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171717] leading-[1.15] max-w-3xl mb-6">
          Unspoken Horizon<span className="text-[#6C3BFF]">.</span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed italic mb-8">
          &quot;Observing the world in quiet nuances; weaving thought, culture, and human truth into living words.&quot;
        </p>

        {/* Hero CTAs */}
        <div className="flex items-center gap-4">
          <a href="#writings" className="btn-primary cursor-pointer">
            Explore Writings
          </a>
          <a href="#author-bio" className="btn-secondary cursor-pointer">
            About Abigael
          </a>
        </div>
      </section>

      {/* Articles Grid */}
      <section id="writings" className="max-w-5xl mx-auto px-6 py-12 border-t border-zinc-200/60 scroll-mt-24">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
          Latest Essays & Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post._id}
                href={`/posts/${post.slug?.current || ''}`}
                className="group block bg-white p-6 rounded-2xl border border-zinc-200/70 hover:border-[#EEE8FF] hover:shadow-md transition-all duration-200"
              >
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-[#EEE8FF] text-[#6C3BFF] rounded-md mb-4">
                  {post.category || 'Essay'}
                </span>
                <h3 className="text-xl font-bold text-[#171717] group-hover:text-[#6C3BFF] transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-zinc-600 text-sm line-clamp-2 leading-relaxed mb-4">
                  {post.excerpt || 'Read the complete article on Unspoken Horizon.'}
                </p>
                <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
                  <span>{post.date || 'Recent'}</span>
                  <span className="text-[#6C3BFF] font-semibold group-hover:translate-x-1 transition-transform">
                    Read Post &rarr;
                  </span>
                </div>
              </Link>
            ))
          ) : (
            /* Fallback Card for Initial Demo */
            <Link
              href="/studio"
              className="group block bg-white p-6 rounded-2xl border border-zinc-200/70 hover:border-[#EEE8FF] hover:shadow-md transition-all duration-200"
            >
              <span className="inline-block px-2.5 py-1 text-xs font-medium bg-[#EEE8FF] text-[#6C3BFF] rounded-md mb-4">
                Philosophy
              </span>
              <h3 className="text-xl font-bold text-[#171717] group-hover:text-[#6C3BFF] transition-colors mb-2">
                The Poetics of Everyday Quietness
              </h3>
              <p className="text-zinc-600 text-sm line-clamp-2 leading-relaxed mb-4">
                An exploration into how gentle observation shapes our understanding of digital culture, identity, and personal focus.
              </p>
              <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
                <span>Aug 12, 2026</span>
                <span className="text-[#6C3BFF] font-semibold group-hover:translate-x-1 transition-transform">
                  Create First Post in Studio &rarr;
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Author Bio Section */}
      <section id="author-bio" className="max-w-5xl mx-auto px-6 py-12 mb-16 scroll-mt-24">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-[#EEE8FF] text-[#6C3BFF] flex items-center justify-center font-bold text-2xl shrink-0">
            AOS
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#171717] mb-2">
              Abigael Osward Sanga
            </h3>
            <p className="text-zinc-600 leading-relaxed italic">
              "\"Observing the world in quiet nuances; weaving thought, culture, and human truth into living words.\""
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}