import React from 'react'
import './Home.css';
function Home() {
  return (
    <div>
      <div className="hero-container">
        <div className="hero-overlay">
          <h1>
            Lee Lab
          </h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
        {/* About Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">About</h2>
          <p className="mb-4 text-slate-200">
            The Lee Lab at Boston Children’s Hospital and Harvard Medical School studies the mechanisms of autoinflammatory and autoimmune disease in children. 
            We focus on understanding how rare genetic variants and dysregulated immune pathways drive uncontrolled inflammation, with the goal of translating these discoveries into better diagnostics and therapies.
          </p>
        </div>
        {/* Contact Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2 text-white">Contact</h3>
          <ul className="list-none ml-0 text-slate-200 space-y-1">
            <li>
              <span className="font-semibold">PI:</span> Pui Lee, MD, PhD (<a href="mailto:pui.lee@childrens.harvard.edu" className="underline">pui.lee@childrens.harvard.edu</a>)
            </li>
            <li className="mt-2 font-semibold">Fellows:</li>
            <li>Michael Lam, MD, PhD (<a href="mailto:michael.lam@childrens.harvard.edu" className="underline">michael.lam@childrens.harvard.edu</a>)</li>
            <li>Casey Rimland MD, PhD (<a href="mailto:casey.rimland@childrens.harvard.edu" className="underline">casey.rimland@childrens.harvard.edu</a>)</li>
            <li>Musaab Alhezam MD (<a href="mailto:musaab.alhezam@childrens.harvard.edu" className="underline">musaab.alhezam@childrens.harvard.edu</a>)</li>
            <li className="mt-2 font-semibold">Visiting Scholars:</li>
            <li>Jian Yue, MD (<a href="mailto:jian.yue@childrens.harvard.edu" className="underline">jian.yue@childrens.harvard.edu</a>)</li>
            <li>Seigo Okada, MD (<a href="mailto:seigo.okada@childrens.harvard.edu" className="underline">seigo.okada@childrens.harvard.edu</a>)</li>
            <li className="mt-2 font-semibold">RAs:</li>
            <li>Evan Hsu (<a href="mailto:evan.hsu@childrens.harvard.edu" className="underline">evan.hsu@childrens.harvard.edu</a>)</li>
            <li>Courtney Leson (<a href="mailto:courtney.leson@childrens.harvard.edu" className="underline">courtney.leson@childrens.harvard.edu</a>)</li>
            </ul>
        </div>
      </div>
    </div>
  );
}
export default Home