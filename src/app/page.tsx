import ShopLayout from '@/components/layout/ShopLayout';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import NewDropsSection from '@/components/home/NewDropsSection';
import StorytellingSection from '@/components/home/StorytellingSection';
import TrendingSection from '@/components/home/TrendingSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <ShopLayout>
      <div className="flex flex-col gap-20">
        <HeroSection />
        <CategoriesSection />
        <NewDropsSection />
        <StorytellingSection />
        <TrendingSection />
        <NewsletterSection />
      </div>
    </ShopLayout>
  );
}
