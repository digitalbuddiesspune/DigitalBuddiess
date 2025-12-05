import React from 'react'

function Blog() {
  const blogPosts = [
    {
      title: 'The Future of Web Development in 2024',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
      date: 'March 15, 2024',
      category: 'Web Development',
      readTime: '5 min read'
    },
    {
      title: 'Digital Marketing Strategies That Actually Work',
      excerpt: 'Learn about proven digital marketing strategies that can help grow your business.',
      date: 'March 10, 2024',
      category: 'Marketing',
      readTime: '7 min read'
    },
    {
      title: 'Mobile-First Design: Why It Matters',
      excerpt: 'Understanding the importance of mobile-first design in today\'s digital landscape.',
      date: 'March 5, 2024',
      category: 'Design',
      readTime: '4 min read'
    },
    {
      title: 'Cloud Migration: A Complete Guide',
      excerpt: 'Everything you need to know about migrating your business to the cloud.',
      date: 'February 28, 2024',
      category: 'Cloud',
      readTime: '10 min read'
    },
    {
      title: 'Building Scalable Applications',
      excerpt: 'Best practices for building applications that can grow with your business.',
      date: 'February 20, 2024',
      category: 'Development',
      readTime: '6 min read'
    },
    {
      title: 'The Power of User Experience Design',
      excerpt: 'How great UX design can transform your product and increase user satisfaction.',
      date: 'February 15, 2024',
      category: 'Design',
      readTime: '5 min read'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and tips from our team
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-orange-800 to-orange-900"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-orange-800">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-orange-800 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-orange-800 font-semibold hover:text-orange-900 transition-colors duration-300">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gray-900 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Get the latest articles and updates delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-800"
            />
            <button className="bg-orange-800 hover:bg-orange-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
