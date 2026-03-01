const quizzesData = [
  // 1. A Review of General Chemistry
  {
    id: 1,
    title: "A Review of General Chemistry",
    topic: "A Review of General Chemistry",
    description: "Check your foundation in key general chemistry ideas that support organic chemistry.",
    questions: [
      {
        question: "Which subatomic particles are found in the nucleus of an atom?",
        options: ["Protons and electrons", "Protons and neutrons", "Neutrons and electrons", "Electrons only"],
        correct: "Protons and neutrons",
      },
      {
        question: "An atom with 6 protons, 6 neutrons, and 6 electrons is:",
        options: ["Oxygen", "Nitrogen", "Carbon", "Fluorine"],
        correct: "Carbon",
      },
      {
        question: "Which of the following is an example of a covalent bond?",
        options: ["NaCl", "KBr", "HCl", "CaO"],
        correct: "HCl",
      },
      {
        question: "Which element is the most electronegative?",
        options: ["Oxygen", "Fluorine", "Nitrogen", "Chlorine"],
        correct: "Fluorine",
      },
      {
        question: "When two atoms form a bond and share electrons equally, the bond is:",
        options: ["Ionic", "Polar covalent", "Nonpolar covalent", "Metallic"],
        correct: "Nonpolar covalent",
      },
      {
        question: "Which statement about valence electrons is TRUE?",
        options: [
          "They are found in the innermost shell",
          "They do not participate in bonding",
          "They determine an atom’s reactivity",
          "They are always paired",
        ],
        correct: "They determine an atom’s reactivity",
      },
      {
        question: "Which of the following is a physical change?",
        options: ["Rusting of iron", "Burning methane", "Ice melting", "Digestion of food"],
        correct: "Ice melting",
      },
      {
        question: "Which of the following species has 8 valence electrons?",
        options: ["Ne", "Na", "Cl", "H"],
        correct: "Ne",
      },
      {
        question: "What is the correct electron configuration for carbon (atomic number 6)?",
        options: ["1s2 2s2 2p2", "1s2 2s2 2p4", "1s2 2s1 2p3", "1s2 2s2 2p6"],
        correct: "1s2 2s2 2p2",
      },
      {
        question: "Which statement best describes an exothermic reaction?",
        options: [
          "It absorbs heat from the surroundings",
          "It releases heat to the surroundings",
          "It does not involve energy changes",
          "It always involves breaking bonds only",
        ],
        correct: "It releases heat to the surroundings",
      },
    ],
  },

  // 2. Molecular Representations
  {
    id: 2,
    title: "Molecular Representations",
    topic: "Molecular Representations",
    description: "Practice reading and drawing condensed, Lewis, and line-angle structures.",
    questions: [
      {
        question: "Which representation shows ALL atoms and bonds explicitly?",
        options: ["Line-angle formula", "Condensed formula", "Skeletal structure", "Lewis structure"],
        correct: "Lewis structure",
      },
      {
        question: "In line-angle (skeletal) structures, each vertex usually represents:",
        options: ["A hydrogen atom", "A carbon atom", "An oxygen atom", "A lone pair"],
        correct: "A carbon atom",
      },
      {
        question: "In a skeletal structure, hydrogens attached to carbon are usually:",
        options: ["Always drawn", "Never drawn", "Usually implied (not drawn)", "Drawn only on double bonds"],
        correct: "Usually implied (not drawn)",
      },
      {
        question: "Which is the correct condensed formula for propane?",
        options: ["CH4", "CH3CH2CH3", "CH3CH3", "C3H8O"],
        correct: "CH3CH2CH3",
      },
      {
        question: "A molecule of butane has how many carbon atoms?",
        options: ["2", "3", "4", "5"],
        correct: "4",
      },
      {
        question: "In a proper Lewis structure for methane (CH4):",
        options: [
          "Carbon has 6 bonds",
          "Carbon has 4 bonds",
          "Carbon has 2 bonds and 2 lone pairs",
          "Hydrogen has 2 bonds each",
        ],
        correct: "Carbon has 4 bonds",
      },
      {
        question: "In a skeletal structure, a double bond is shown as:",
        options: ["A dashed line", "Two parallel lines", "A wedge", "A single bold line"],
        correct: "Two parallel lines",
      },
      {
        question: "Which of the following represents an alcohol functional group?",
        options: ["–OH attached to carbon", "–NH2 attached to carbon", "C=O", "C≡N"],
        correct: "–OH attached to carbon",
      },
      {
        question: "When drawing resonance structures, which of the following can move?",
        options: ["Atoms only", "Electrons only (in π bonds or lone pairs)", "Both atoms and sigma bonds", "Nuclei only"],
        correct: "Electrons only (in π bonds or lone pairs)",
      },
      {
        question: "When counting the number of hydrogens in a skeletal structure, you must:",
        options: [
          "Ignore carbons",
          "Assume each carbon has 4 bonds total",
          "Add hydrogens only to heteroatoms",
          "Always draw hydrogens first",
        ],
        correct: "Assume each carbon has 4 bonds total",
      },
    ],
  },

  // 3. Acids and Bases
  {
    id: 3,
    title: "Acids and Bases",
    topic: "Acids and Bases",
    description: "Strengthen your understanding of Brønsted and Lewis acids, pKa, and stability trends.",
    questions: [
      {
        question: "A Brønsted–Lowry acid is defined as a species that:",
        options: ["Donates a proton", "Accepts a proton", "Donates an electron pair", "Accepts an electron pair"],
        correct: "Donates a proton",
      },
      {
        question: "Which of the following is a Lewis acid?",
        options: ["NH3", "H2O", "BF3", "OH−"],
        correct: "BF3",
      },
      {
        question: "A lower pKa value corresponds to:",
        options: ["A weaker acid", "A stronger acid", "No relation to acidity", "A stronger base"],
        correct: "A stronger acid",
      },
      {
        question: "The conjugate base of HCl is:",
        options: ["Cl−", "H2Cl", "HCl2−", "OH−"],
        correct: "Cl−",
      },
      {
        question: "Which factor often makes an acid stronger?",
        options: [
          "Less electronegative atom bearing the negative charge",
          "More electronegative atom bearing the negative charge",
          "Positive charge on the conjugate base",
          "Larger pKa value",
        ],
        correct: "More electronegative atom bearing the negative charge",
      },
      {
        question: "Which of the following is typically the strongest acid?",
        options: ["Phenol", "Alcohol (ROH)", "Water", "Alkyne (terminal)"],
        correct: "Phenol",
      },
      {
        question: "For a pair of acids differing only by the size of the atom bearing the negative charge, acidity generally:",
        options: ["Increases up a group", "Decreases down a group", "Increases down a group", "Is independent of size"],
        correct: "Increases down a group",
      },
      {
        question: "Which of these pairs correctly describes an acid and its conjugate base?",
        options: ["H2O / H3O+", "NH3 / NH4+", "CH3COOH / CH3COO−", "HCl / HCl+"],
        correct: "CH3COOH / CH3COO−",
      },
      {
        question: "Resonance in the conjugate base of an acid generally:",
        options: [
          "Makes the acid weaker",
          "Has no effect on acidity",
          "Stabilizes the conjugate base and strengthens the acid",
          "Destabilizes the conjugate base",
        ],
        correct: "Stabilizes the conjugate base and strengthens the acid",
      },
      {
        question: "In water, which of the following is the strongest base?",
        options: ["OH−", "Cl−", "NO3−", "HSO4−"],
        correct: "OH−",
      },
    ],
  },

  // 4. Alkanes and Cycloalkanes
  {
    id: 4,
    title: "Alkanes and Cycloalkanes",
    topic: "Alkanes and Cycloalkanes",
    description: "Focus on structure, nomenclature, and conformations of alkanes and cycloalkanes.",
    questions: [
      {
        question: "Alkanes contain which types of bonds?",
        options: ["C–C single bonds only", "C=C double bonds", "C≡C triple bonds", "C–C double and triple bonds"],
        correct: "C–C single bonds only",
      },
      {
        question: "Which of the following is the correct formula for an acyclic alkane?",
        options: ["CnH2n+2", "CnH2n", "CnH2n−2", "CnHn"],
        correct: "CnH2n+2",
      },
      {
        question: "The IUPAC name for CH3CH2CH2CH3 is:",
        options: ["Methane", "Ethane", "Propane", "Butane"],
        correct: "Butane",
      },
      {
        question: "A cycloalkane has the general formula:",
        options: ["CnH2n+2", "CnH2n", "CnH2n−2", "CnH4n"],
        correct: "CnH2n",
      },
      {
        question: "In the chair conformation of cyclohexane, the lowest-energy arrangement is:",
        options: ["All substituents axial", "All substituents equatorial", "Staggered bonds around the ring", "Boat conformation"],
        correct: "All substituents equatorial",
      },
      {
        question: "Which conformation of butane is the lowest in energy?",
        options: ["Eclipsed", "Totally eclipsed", "Gauche", "Anti"],
        correct: "Anti",
      },
      {
        question: "Ring strain in cyclopropane is mainly due to:",
        options: ["Angle strain only", "Torsional strain only", "Angle and torsional strain", "Steric hindrance only"],
        correct: "Angle and torsional strain",
      },
      {
        question: "Which substituent arrangement on cyclohexane is usually more stable?",
        options: ["Both substituents axial", "Both substituents equatorial", "One axial, one equatorial", "All are equal"],
        correct: "Both substituents equatorial",
      },
      {
        question: "Isomers that differ by rotation around single bonds are called:",
        options: ["Constitutional isomers", "Stereoisomers", "Conformational isomers", "Geometric isomers"],
        correct: "Conformational isomers",
      },
      {
        question: "Which statement about Newman projections is TRUE?",
        options: [
          "They show a molecule as a flat structure",
          "They emphasize the relative energies of conformations",
          "They are only used for double bonds",
          "They do not show hydrogen atoms",
        ],
        correct: "They emphasize the relative energies of conformations",
      },
    ],
  },

  // 5. Stereoisomerism
  {
    id: 5,
    title: "Stereoisomerism",
    topic: "Stereoisomerism",
    description: "Test your understanding of chirality, R/S, enantiomers, and diastereomers.",
    questions: [
      {
        question: "A chiral center is typically a carbon atom that:",
        options: [
          "Has two identical groups attached",
          "Has four different groups attached",
          "Is part of a double bond",
          "Has only hydrogen atoms attached",
        ],
        correct: "Has four different groups attached",
      },
      {
        question: "Two molecules that are non-superimposable mirror images are called:",
        options: ["Enantiomers", "Diastereomers", "Constitutional isomers", "Conformers"],
        correct: "Enantiomers",
      },
      {
        question: "What do diastereomers have in common?",
        options: [
          "They are mirror images",
          "They differ at some, but not all, stereocenters",
          "They have completely different connectivity",
          "They always have identical physical properties",
        ],
        correct: "They differ at some, but not all, stereocenters",
      },
      {
        question: "A racemic mixture contains:",
        options: [
          "Only one enantiomer",
          "Equal amounts of two enantiomers",
          "Two diastereomers",
          "Only achiral molecules",
        ],
        correct: "Equal amounts of two enantiomers",
      },
      {
        question: "Which property is usually identical for a pair of enantiomers in an achiral environment?",
        options: ["Optical rotation", "Boiling point", "Interaction with plane-polarized light", "Biological activity"],
        correct: "Boiling point",
      },
      {
        question: "If a molecule has a plane of symmetry, it is usually:",
        options: ["Chiral", "Achiral", "Always optically active", "Impossible to assign"],
        correct: "Achiral",
      },
      {
        question: "R and S configurations are assigned based on:",
        options: [
          "The direction of optical rotation",
          "Cahn–Ingold–Prelog priority rules",
          "The size of the groups only",
          "The number of double bonds",
        ],
        correct: "Cahn–Ingold–Prelog priority rules",
      },
      {
        question: "Meso compounds are best described as:",
        options: [
          "Chiral molecules with one stereocenter",
          "Achiral molecules with stereocenters and a plane of symmetry",
          "Pairs of enantiomers",
          "Diastereomers with no symmetry",
        ],
        correct: "Achiral molecules with stereocenters and a plane of symmetry",
      },
      {
        question: "Two stereoisomers that differ by rotation around a double bond are known as:",
        options: ["Enantiomers", "E/Z isomers", "Constitutional isomers", "Meso forms"],
        correct: "E/Z isomers",
      },
      {
        question: "A chiral environment (like an enzyme) can:",
        options: [
          "Never distinguish between enantiomers",
          "Always convert one enantiomer into the other",
          "Often bind one enantiomer more strongly than the other",
          "Destroy chirality",
        ],
        correct: "Often bind one enantiomer more strongly than the other",
      },
    ],
  },

  // 6. Chemical Reactions and Curved Arrows
  {
    id: 6,
    title: "Chemical Reactions and Curved Arrows",
    topic: "Chemical Reactions and Curved Arrows",
    description: "Practice using curved arrows to show electron flow in organic reactions.",
    questions: [
      {
        question: "Curved arrows in reaction mechanisms represent the movement of:",
        options: ["Atoms", "Protons only", "Electrons", "Bonds rotating"],
        correct: "Electrons",
      },
      {
        question: "A full (double-headed) curved arrow usually indicates:",
        options: ["Movement of one electron", "Movement of two electrons", "No electrons move", "Movement of a proton"],
        correct: "Movement of two electrons",
      },
      {
        question: "A nucleophile is best described as:",
        options: [
          "Electron-poor and seeking electrons",
          "Electron-rich and seeking a positive center",
          "Always neutral",
          "Always negatively charged and unreactive",
        ],
        correct: "Electron-rich and seeking a positive center",
      },
      {
        question: "An electrophile is:",
        options: [
          "Electron-rich and donates electrons easily",
          "Electron-poor and accepts electrons",
          "Always negatively charged",
          "Never involved in substitution reactions",
        ],
        correct: "Electron-poor and accepts electrons",
      },
      {
        question: "When drawing a curved arrow, the tail of the arrow should start from:",
        options: [
          "A nucleus only",
          "A positive charge",
          "A lone pair or bond (where electrons are)",
          "The product",
        ],
        correct: "A lone pair or bond (where electrons are)",
      },
      {
        question: "The head of a curved arrow points to:",
        options: [
          "A place where electrons are leaving",
          "A place where electrons are going",
          "Any atom in the molecule",
          "The solvent",
        ],
        correct: "A place where electrons are going",
      },
      {
        question: "Which step often occurs first in many acid–base mechanisms?",
        options: ["Breaking a bond without assistance", "Moving atoms with arrows", "Proton transfer", "Radical formation"],
        correct: "Proton transfer",
      },
      {
        question: "In a typical substitution mechanism, a nucleophile:",
        options: [
          "Leaves the molecule",
          "Attacks the electrophilic carbon",
          "Only attacks hydrogen",
          "Remains unchanged and unbound",
        ],
        correct: "Attacks the electrophilic carbon",
      },
      {
        question: "In a reaction energy diagram, the highest point corresponds to:",
        options: ["Reactants", "Products", "Transition state", "Intermediate"],
        correct: "Transition state",
      },
      {
        question: "A stepwise mechanism often involves:",
        options: [
          "Only one transition state",
          "More than one intermediate and transition state",
          "No intermediates at all",
          "Only radicals",
        ],
        correct: "More than one intermediate and transition state",
      },
    ],
  },

  // 7. Alkyl Halides – Substitution and Elimination Reactions
  {
    id: 7,
    title: "Alkyl Halides Substitution and Elimination Reactions",
    topic: "Alkyl Halides Substitution and Elimination Reactions",
    description: "Differentiate between SN1, SN2, E1, and E2 reactions of alkyl halides.",
    questions: [
      {
        question: "In an SN2 reaction, the nucleophile attacks:",
        options: [
          "From any direction with equal probability",
          "From the same side as the leaving group",
          "From the opposite side of the leaving group (backside attack)",
          "Not at carbon at all",
        ],
        correct: "From the opposite side of the leaving group (backside attack)",
      },
      {
        question: "Which factor favors an SN2 reaction?",
        options: ["Tertiary carbon", "Weak nucleophile", "Strong nucleophile and primary carbon", "Bulky base"],
        correct: "Strong nucleophile and primary carbon",
      },
      {
        question: "Which reaction type often gives a racemic mixture of products?",
        options: ["SN2", "SN1", "E2", "Radical substitution"],
        correct: "SN1",
      },
      {
        question: "What is the rate law for an SN1 reaction?",
        options: [
          "Rate = k[substrate][nucleophile]",
          "Rate = k[nucleophile]",
          "Rate = k[substrate]",
          "Rate = k[substrate]^2",
        ],
        correct: "Rate = k[substrate]",
      },
      {
        question: "E2 reactions typically involve:",
        options: [
          "Two steps with an intermediate carbocation",
          "One concerted step with base and substrate",
          "No base at all",
          "Only primary alkyl halides",
        ],
        correct: "One concerted step with base and substrate",
      },
      {
        question: "Which is a good leaving group for substitution and elimination?",
        options: ["OH−", "H−", "Cl−", "NH2−"],
        correct: "Cl−",
      },
      {
        question: "Increasing the strength and bulkiness of the base generally favors:",
        options: ["SN1", "SN2", "E1", "E2"],
        correct: "E2",
      },
      {
        question: "In an E2 reaction, the proton that is removed is usually:",
        options: [
          "On the same carbon as the leaving group",
          "On a carbon adjacent (β) to the leaving group",
          "On a distant carbon only",
          "From the solvent",
        ],
        correct: "On a carbon adjacent (β) to the leaving group",
      },
      {
        question: "Carbocation rearrangements (like hydride shifts) are common in which mechanism?",
        options: ["SN2", "E2", "SN1/E1", "Radical substitution only"],
        correct: "SN1/E1",
      },
      {
        question: "A tertiary alkyl halide treated with a strong, bulky base is most likely to undergo:",
        options: ["SN2", "SN1", "E1", "E2"],
        correct: "E2",
      },
    ],
  },

  // 8. Reactions of Alkenes
  {
    id: 8,
    title: "Reactions of Alkenes",
    topic: "Reactions of Alkenes",
    description: "Review electrophilic additions, Markovnikov vs anti-Markovnikov, and regioselectivity.",
    questions: [
      {
        question: "Alkenes are generally best described as:",
        options: ["Nucleophiles", "Electrophiles", "Inert gases", "Strong acids"],
        correct: "Nucleophiles",
      },
      {
        question: "Markovnikov’s rule states that in HX addition to an unsymmetrical alkene:",
        options: [
          "H goes to the more substituted carbon",
          "H goes to the less substituted carbon",
          "X never adds to the double bond",
          "The product is always symmetrical",
        ],
        correct: "H goes to the less substituted carbon",
      },
      {
        question: "Hydrohalogenation (addition of HBr to an alkene) typically proceeds via:",
        options: ["Radical mechanism only", "Carbocation intermediate", "Concerted pericyclic step", "No mechanism"],
        correct: "Carbocation intermediate",
      },
      {
        question: "Which reagent combination gives anti-Markovnikov addition of HBr to an alkene?",
        options: ["HBr only", "HBr and peroxides (ROOR)", "HBr and water", "HBr and a strong base"],
        correct: "HBr and peroxides (ROOR)",
      },
      {
        question: "Hydration of alkenes with acid and water (H3O+) produces:",
        options: ["Alkanes", "Alcohols", "Ethers", "Aldehydes"],
        correct: "Alcohols",
      },
      {
        question: "Which alkene reaction forms a cyclic bromonium ion intermediate?",
        options: ["Hydrohalogenation", "Halogenation with Br2", "Hydration", "Hydroboration–oxidation"],
        correct: "Halogenation with Br2",
      },
      {
        question: "Hydroboration–oxidation of an alkene (BH3/THF, then H2O2, NaOH) gives:",
        options: [
          "Markovnikov alcohol",
          "Anti-Markovnikov alcohol",
          "Alkyl halide",
          "Vicinal dihalide",
        ],
        correct: "Anti-Markovnikov alcohol",
      },
      {
        question: "Syn addition means:",
        options: [
          "Groups add to opposite faces of the double bond",
          "Groups add to the same face of the double bond",
          "Only one group adds",
          "The reaction does not change stereochemistry",
        ],
        correct: "Groups add to the same face of the double bond",
      },
      {
        question: "Ozonolysis of an alkene generally yields:",
        options: ["Alcohols", "Carboxylic acids and/or aldehydes/ketones", "Alkanes", "Ethers"],
        correct: "Carboxylic acids and/or aldehydes/ketones",
      },
      {
        question: "In dihydroxylation of an alkene with OsO4 followed by NaHSO3, the product is:",
        options: ["A dihalide", "A diol (two OH groups added syn)", "An alkane", "An ether"],
        correct: "A diol (two OH groups added syn)",
      },
    ],
  },

  // 9. Alkynes
  {
    id: 9,
    title: "Alkynes",
    topic: "Alkynes",
    description: "Focus on acidity, nucleophilicity of terminal alkynes, and addition reactions.",
    questions: [
      {
        question: "Alkynes contain which type of carbon–carbon bond?",
        options: ["Single", "Double", "Triple", "Aromatic"],
        correct: "Triple",
      },
      {
        question: "A terminal alkyne is one where the triple bond is:",
        options: [
          "In the center of the chain",
          "At the end of the carbon chain with an H attached",
          "In a ring",
          "Always substituted with halogens",
        ],
        correct: "At the end of the carbon chain with an H attached",
      },
      {
        question: "Terminal alkynes are relatively acidic compared to alkanes and alkenes because:",
        options: [
          "They contain oxygen",
          "They contain nitrogen",
          "The sp-hybridized carbon is more electronegative",
          "They always have a positive charge",
        ],
        correct: "The sp-hybridized carbon is more electronegative",
      },
      {
        question: "Deprotonation of a terminal alkyne with a strong base forms:",
        options: ["A carbocation", "An alkoxide", "An acetylide (alkynide) anion", "An alkyl radical"],
        correct: "An acetylide (alkynide) anion",
      },
      {
        question: "Acetylide anions are useful because they:",
        options: [
          "Act as strong electrophiles",
          "Undergo SN2 reactions to form new C–C bonds",
          "Cannot react with alkyl halides",
          "Always give elimination products",
        ],
        correct: "Undergo SN2 reactions to form new C–C bonds",
      },
      {
        question: "Addition of excess H2 with a metal catalyst (like Pd/C) to an alkyne produces:",
        options: ["An alkene", "An alkane", "A diene", "No reaction"],
        correct: "An alkane",
      },
      {
        question: "Partial hydrogenation of an alkyne with Lindlar’s catalyst gives:",
        options: ["Trans alkene", "Cis alkene", "Alkane", "No reaction"],
        correct: "Cis alkene",
      },
      {
        question: "Reduction of an alkyne with Na/NH3 (liquid ammonia) gives:",
        options: ["Cis alkene", "Trans alkene", "Alkane", "Alcohol"],
        correct: "Trans alkene",
      },
      {
        question: "Hydrohalogenation of an alkyne (adding HX) generally:",
        options: [
          "Adds one equivalent of HX to give only an alkene",
          "Adds one or two equivalents to give vinyl or geminal dihalides",
          "Does not proceed",
          "Always forms radicals only",
        ],
        correct: "Adds one or two equivalents to give vinyl or geminal dihalides",
      },
      {
        question: "Ozonolysis of an internal alkyne typically yields:",
        options: ["Alcohols", "Carboxylic acids or ketones", "Alkanes", "Aldehydes only"],
        correct: "Carboxylic acids or ketones",
      },
    ],
  },

  // 10. Radical Reactions
  {
    id: 10,
    title: "Radical Reactions",
    topic: "Radical Reactions",
    description: "Test your knowledge of radical chain mechanisms, initiation, propagation, and termination.",
    questions: [
      {
        question: "A radical is best described as:",
        options: [
          "A positively charged species",
          "A negatively charged species",
          "A species with an unpaired electron",
          "A neutral species with no electrons",
        ],
        correct: "A species with an unpaired electron",
      },
      {
        question: "In a radical chain mechanism, which step creates radicals from non-radicals?",
        options: ["Initiation", "Propagation", "Termination", "Rearrangement"],
        correct: "Initiation",
      },
      {
        question: "Which step in radical reactions usually accounts for most product formation?",
        options: ["Initiation", "Propagation", "Termination", "All equally"],
        correct: "Propagation",
      },
      {
        question: "In the presence of peroxides, addition of HBr to alkenes proceeds by:",
        options: ["Carbocation mechanism", "Radical mechanism", "Substitution only", "No reaction"],
        correct: "Radical mechanism",
      },
      {
        question: "Which halogen is MOST selective in radical halogenation of alkanes?",
        options: ["F2", "Cl2", "Br2", "I2"],
        correct: "Br2",
      },
      {
        question: "Termination steps in radical mechanisms occur when:",
        options: [
          "Radicals are generated",
          "Radicals react with each other to form non-radical products",
          "No reaction occurs",
          "Radicals react with solvent only",
        ],
        correct: "Radicals react with each other to form non-radical products",
      },
      {
        question: "Why is F2 rarely used in radical halogenation of alkanes?",
        options: [
          "It is too unreactive",
          "It is extremely reactive and often explosive",
          "It gives no products",
          "It always favors primary radicals",
        ],
        correct: "It is extremely reactive and often explosive",
      },
      {
        question: "Radical stability generally increases in the order:",
        options: [
          "Tertiary < secondary < primary",
          "Primary < secondary < tertiary",
          "Primary > tertiary > secondary",
          "All the same",
        ],
        correct: "Primary < secondary < tertiary",
      },
      {
        question: "Which is a common radical initiator?",
        options: ["H2O", "ROOR (peroxides)", "NaCl", "HCl"],
        correct: "ROOR (peroxides)",
      },
      {
        question: "Radicals are often drawn with which notation?",
        options: ["Plus sign (+)", "Minus sign (−)", "Dot (•)", "Arrow"],
        correct: "Dot (•)",
      },
    ],
  },

  // 11. Alcohols and Phenols
  {
    id: 11,
    title: "Alcohols and Phenols",
    topic: "Alcohols and Phenols",
    description: "Review structure, acidity, and reactions of alcohols and phenols.",
    questions: [
      {
        question: "An alcohol functional group has the general form:",
        options: ["R–NH2", "R–OH", "R–COOH", "R–SH"],
        correct: "R–OH",
      },
      {
        question: "Phenol is best described as:",
        options: [
          "An alcohol attached to an sp3 carbon",
          "An OH group directly attached to a benzene ring",
          "An ether",
          "An aldehyde",
        ],
        correct: "An OH group directly attached to a benzene ring",
      },
      {
        question: "Compared to a typical alcohol, phenol is:",
        options: ["Less acidic", "More acidic", "Same acidity", "Not acidic at all"],
        correct: "More acidic",
      },
      {
        question: "Which factor contributes to the higher acidity of phenol?",
        options: [
          "Lack of resonance",
          "Resonance stabilization of the phenoxide ion",
          "Stronger O–H bond",
          "No electron delocalization",
        ],
        correct: "Resonance stabilization of the phenoxide ion",
      },
      {
        question: "Oxidation of a primary alcohol with PCC typically gives:",
        options: ["Alkane", "Aldehyde", "Carboxylic acid", "Ether"],
        correct: "Aldehyde",
      },
      {
        question: "Oxidation of a primary alcohol with a strong oxidant like KMnO4 usually gives:",
        options: ["Alkene", "Aldehyde", "Carboxylic acid", "Ketone"],
        correct: "Carboxylic acid",
      },
      {
        question: "Tertiary alcohols under typical oxidation conditions:",
        options: ["Oxidize easily to ketones", "Oxidize to carboxylic acids", "Do not oxidize readily", "Always form aldehydes"],
        correct: "Do not oxidize readily",
      },
      {
        question: "Converting an alcohol into a tosylate (ROTs) makes it:",
        options: [
          "A better leaving group",
          "A worse leaving group",
          "Unreactive",
          "An acid chloride",
        ],
        correct: "A better leaving group",
      },
      {
        question: "Dehydration of an alcohol with strong acid generally yields:",
        options: ["Alkene", "Alkane", "Ether", "Aldehyde"],
        correct: "Alkene",
      },
      {
        question: "Which reagent set is commonly used to convert an alcohol into an alkyl bromide?",
        options: ["HBr", "HCl", "NaBr only", "NaOH"],
        correct: "HBr",
      },
    ],
  },

  // 12. Ethers and Epoxides
  {
    id: 12,
    title: "Ethers and Epoxides",
    topic: "Ethers and Epoxides",
    description: "Test your understanding of ether and epoxide structure and reactivity, plus thiols and sulfides.",
    questions: [
      {
        question: "An ether functional group has the general formula:",
        options: ["R–OH", "R–O–R", "R–SH", "R–COOH"],
        correct: "R–O–R",
      },
      {
        question: "Epoxides are:",
        options: [
          "Three-membered cyclic ethers",
          "Six-membered cyclic ethers",
          "Alcohols",
          "Thiols",
        ],
        correct: "Three-membered cyclic ethers",
      },
      {
        question: "Thiols have the functional group:",
        options: ["R–OH", "R–SH", "R–NH2", "R–COOR"],
        correct: "R–SH",
      },
      {
        question: "Which is generally more acidic?",
        options: ["Alcohols (ROH)", "Thiols (RSH)", "Both equal", "Neither is acidic"],
        correct: "Thiols (RSH)",
      },
      {
        question: "Cleavage of ethers by strong acid (like HI) usually produces:",
        options: ["Alkenes only", "Alcohols and alkyl halides", "Carboxylic acids", "Ketones"],
        correct: "Alcohols and alkyl halides",
      },
      {
        question: "Acid-catalyzed opening of an epoxide typically occurs at:",
        options: [
          "The less substituted carbon",
          "The more substituted carbon",
          "Only at terminal carbons",
          "Does not occur",
        ],
        correct: "The more substituted carbon",
      },
      {
        question: "Under basic conditions, nucleophilic attack on an epoxide usually occurs at:",
        options: [
          "The more substituted carbon",
          "The less substituted carbon",
          "Only at oxygen",
          "Not predictable",
        ],
        correct: "The less substituted carbon",
      },
      {
        question: "Oxidation of a thiol (RSH) commonly forms:",
        options: ["Alkane", "Disulfide (RSSR)", "Epoxide", "Alcohol"],
        correct: "Disulfide (RSSR)",
      },
      {
        question: "Which statement about ethers is generally TRUE?",
        options: [
          "They are very reactive toward bases",
          "They are often good aprotic solvents",
          "They are always strongly acidic",
          "They cannot form hydrogen bonds at all",
        ],
        correct: "They are often good aprotic solvents",
      },
      {
        question: "Why are epoxides more reactive than simple ethers?",
        options: [
          "They are less strained",
          "They have strong C–O bonds",
          "They have significant ring strain in the three-membered ring",
          "They contain no oxygen atoms",
        ],
        correct: "They have significant ring strain in the three-membered ring",
      },
    ],
  },
];

export default quizzesData;
