function Research() {
  return (
    <div className="content-container max-w-3xl mx-auto py-8 space-y-8">
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4">Research</h2>
        <p className="mb-4">
          <span className="font-semibold">The Lee Lab</span> at Boston Children’s Hospital and Harvard Medical School investigates the genetic and molecular mechanisms underlying autoinflammatory and autoimmune diseases in children.
          Our research combines genomics, immunology, and clinical data to discover new pathways and therapeutic targets.
        </p>
      </div>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2">Current Projects</h3>
        <ul className="list-disc list-inside ml-4">
          <li>Genetic analysis of rare immune disorders</li>
          <li>Functional studies of immune cell signaling</li>
          <li>Development of novel diagnostics and treatments</li>
        </ul>
      </div>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2">Recent Highlights</h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            <span className="font-medium">Linked SOCS1 variants</span> to enhanced interferon signaling and autoimmunity <span className="italic">(J Autoimmun, 2023)</span>.
          </li>
          <li>
            <span className="font-medium">Contributed to international consensus guidelines</span> on diagnosis and management of DADA2 <span className="italic">(JAMA Netw Open, 2023)</span>.
          </li>
          <li>
            <span className="font-medium">Identified cycling lymphocytes</span> as drivers of MAS and mapped interferon signatures in hyperinflammatory states <span className="italic">(JCI, 2023)</span>.
          </li>
          <li>
            <span className="font-medium">Characterized the role of monocytes and macrophages</span> in cytokine storm syndromes <span className="italic">(Adv Exp Med Biol, 2024)</span>.
          </li>
          <li>
            <span className="font-medium">Defined contributions of TLR7 overactivation</span> to lupus and MIS-C <span className="italic">(JCI, 2023)</span>.
          </li>
        </ul>
      </div>
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl shadow-md p-6">
        <p>
          For more information about our research, publications, or collaborations, please contact us or visit our lab website.
        </p>
      </div>
    </div>
  );
}
export default Research;