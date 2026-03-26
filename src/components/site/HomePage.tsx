'use client';

import Header from './Header';
import Footer from './Footer';
import HeroSlider from './HeroSlider';
import Link from 'next/link';
import '../../../styles/design-system.css';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-light">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full">
          <HeroSlider />
        </section>
        
        {/* Featured Products Section */}
        <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold" style={{color: 'var(--primary-maroon)'}}>
              Наш каталог
            </h2>
            <p className="text-lg text-gray-600">
              Премиум кофе из лучших регионов мира
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Link 
                key={item}
                href="/catalog"
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="w-full h-64 flex items-center justify-center" style={{backgroundColor: 'var(--primary-beige)'}}>
                    <span style={{color: 'var(--primary-maroon)'}} className="font-bold text-xl">Coffee {item}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--primary-maroon)'}}>
                      Сорт кофе #{item}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Описание продукта с основными характеристиками
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold" style={{color: 'var(--primary-maroon)'}}>от 500₽</span>
                      <button className="btn-primary px-4 py-2 text-sm" style={{backgroundColor: 'var(--primary-maroon)'}}>
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* About Section */}
        <section style={{backgroundColor: 'var(--base)'}} className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6" style={{color: 'var(--primary-maroon)'}}>
                  О CoffeeMan
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Мы занимаемся поставкой премиум кофе из лучших регионов мира. 
                  Каждый сорт тщательно отбирается нашей командой экспертов.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Наша миссия - дарить людям удовольствие от идеальной чашки кофе.
                </p>
              </div>
              <div className="rounded-lg h-96 flex items-center justify-center text-white text-2xl" style={{background: 'linear-gradient(135deg, var(--primary-maroon), var(--primary-marsala))'}}>
                Изображение
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
