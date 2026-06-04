export default function Reviews() {
  const reviewsData = [
    {
      text: "The fabric is incredibly soft — my daughter's sensitive skin had zero reaction. The dress looked even more beautiful in person. Absolute luxury for a wonderful price.",
      author: "Nusrat Jahan",
      child: "Mother of 8-month-old",
      avatar: "🤱"
    },
    {
      text: "Ordered for my niece's naming ceremony — everyone was asking where the dress was from. Petite Lumière is my go-to for every special occasion now.",
      author: "Tasnim Akter",
      child: "Gifted for a 1-year-old",
      avatar: "👩"
    },
    {
      text: "Fast delivery, beautiful packaging, and the quality is just stunning. You can truly feel the premium difference. My baby looks like royalty every day!",
      author: "Roksana Begum",
      child: "Mother of 14-month-old",
      avatar: "🧕"
    }
  ];

  return (
    <section className="bg-ivory py-24 px-6 md:px-18">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-px bg-gold"></div>
        <span className="text-[10px] tracking-[0.32em] uppercase text-gold">
          Happy Mamas
        </span>
      </div>
      <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight text-charcoal mb-4">
        What <em className="italic text-rose-dark">Mothers</em> Say
      </h2>
      <p className="text-sm font-light leading-relaxed text-muted max-w-[420px] mb-16">
        Real reviews from parents who trust Petite Lumière for their little ones.
      </p>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviewsData.map((review, index) => (
          <div 
            key={index}
            className="bg-cream border border-gold/20 py-10 px-9 relative"
          >
            {/* Decorative Quote Mark */}
            <span className="absolute top-4 left-7 font-serif text-[80px] font-light leading-none text-rose-light select-none pointer-events-none">
              “
            </span>
            
            <div className="text-gold text-[13px] tracking-[3px] mb-5 relative z-10">
              ★★★★★
            </div>
            <p className="font-serif text-[17px] font-light italic leading-[1.7] text-charcoal mb-7 relative z-10">
              "{review.text}"
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center text-lg">
                {review.avatar}
              </div>
              <div>
                <div className="text-xs font-medium text-charcoal tracking-[0.08em] uppercase">
                  {review.author}
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  {review.child}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}