/*
  ASL for Teachers: site data
  ---------------------------------------------------------------
  This is the one file you edit to add or change content.

  SIGNS
    id         short lowercase name used in page addresses
    gloss      the sign written in capital letters
    meaning    plain English meaning
    category   one of the Module 2 lesson ids below
    summary    one-line description of how the sign is made
    recipe     the sign card: hand, hands, location, movement, face.
               Use the ids from HANDSHAPES, LOCATIONS, MOVEMENTS, FACES.
               hands: "one", "both", or "base" (one hand works on the other).
               A sign made of two signs uses compound: ["GOOD", "MORNING"].
    form       optional detailed breakdown (handshape, location,
               movement, face). Leave out until reviewed.
    classroom  list of short classroom situations
    related    ids of related signs
    reviewed   set to true once your ASL consultant has checked it

  All descriptions below are DRAFTS written for planning.
  They must be checked and corrected by a fluent ASL signer.
*/

const SIGNS = [
  /* Greetings and Attendance */
  { id: "hello", gloss: "HELLO", meaning: "Hello, hi", category: "greetings",
    recipe: { hand: "flat", hands: "one", location: "forehead", movement: "forward", face: "happy" },
    summary: "Flat hand starts near the forehead and moves outward, like a small salute.",
    classroom: ["Greeting students at the door each morning."], related: ["good-morning", "welcome", "goodbye"] },
  { id: "good-morning", gloss: "GOOD MORNING", meaning: "Good morning", category: "greetings",
    recipe: { compound: ["GOOD", "MORNING"], face: "happy" },
    summary: "Two signs together: GOOD, then MORNING.",
    classroom: ["Opening Morning Meeting."], related: ["hello", "good-afternoon"] },
  { id: "good-afternoon", gloss: "GOOD AFTERNOON", meaning: "Good afternoon", category: "greetings",
    recipe: { compound: ["GOOD", "AFTERNOON"], face: "happy" },
    summary: "Two signs together: GOOD, then AFTERNOON.",
    classroom: ["Welcoming students back after lunch."], related: ["good-morning", "hello"] },
  { id: "goodbye", gloss: "GOODBYE", meaning: "Goodbye, bye", category: "greetings",
    recipe: { hand: "flat", hands: "one", location: "high", movement: "close", face: "happy" },
    summary: "Open hand facing out, fingers fold down and up a few times.",
    classroom: ["Dismissal at the end of the day."], related: ["see-you-tomorrow", "hello"] },
  { id: "name", gloss: "NAME", meaning: "Name", category: "greetings",
    recipe: { hand: "h", hands: "both", location: "neutral", movement: "tap", face: "neutral" },
    summary: "Both hands in an H shape; the top fingers tap across the other H twice.",
    classroom: ["Asking a new student their name.", "Introducing a classroom visitor."], related: ["nice-to-meet-you"] },
  { id: "here", gloss: "HERE", meaning: "Here, present", category: "greetings",
    recipe: { hand: "flat", hands: "both", location: "low", movement: "circle", face: "neutral" },
    summary: "Both flat hands, palms up, make small circles in front of the body.",
    classroom: ["Taking attendance."], related: ["name"] },
  { id: "welcome", gloss: "WELCOME", meaning: "Welcome", category: "greetings",
    recipe: { hand: "flat", hands: "one", location: "neutral", movement: "sweep-in", face: "happy" },
    summary: "Flat hand, palm up, sweeps in toward the body.",
    classroom: ["Welcoming families on open house night.", "First day of school."], related: ["hello"] },
  { id: "nice-to-meet-you", gloss: "NICE TO MEET YOU", meaning: "Nice to meet you", category: "greetings",
    recipe: { compound: ["NICE", "MEET", "YOU"], face: "happy" },
    summary: "Three signs together: NICE, MEET, YOU.",
    classroom: ["Meeting a new student or family member."], related: ["name", "hello"] },
  { id: "how-are-you", gloss: "HOW ARE YOU?", meaning: "How are you?", category: "greetings",
    recipe: { compound: ["HOW", "YOU"], face: "curious" },
    summary: "HOW, then point to the person, with eyebrows lowered for a question.",
    classroom: ["Checking in with a student one to one."], related: ["fine", "happy"] },
  { id: "see-you-tomorrow", gloss: "SEE YOU TOMORROW", meaning: "See you tomorrow", category: "greetings",
    recipe: { compound: ["SEE", "TOMORROW"], face: "happy" },
    summary: "Two signs together: SEE, then TOMORROW.",
    classroom: ["Dismissal at the end of the day."], related: ["goodbye"] },

  /* Directions and Routines */
  { id: "sit", gloss: "SIT", meaning: "Sit, sit down", category: "routines",
    recipe: { hand: "h", hands: "base", location: "neutral", movement: "tap", face: "neutral" },
    summary: "Two bent fingers of one hand rest on top of two fingers of the other hand.",
    classroom: ["Bringing students to the carpet.", "Starting independent work."], related: ["stand", "wait"] },
  { id: "stand", gloss: "STAND", meaning: "Stand, stand up", category: "routines",
    recipe: { hand: "v", hands: "base", location: "low", movement: "down", face: "neutral" },
    summary: "Upside-down V hand stands on the flat palm of the other hand.",
    classroom: ["Getting ready to line up."], related: ["sit", "line-up"] },
  { id: "wait", gloss: "WAIT", meaning: "Wait, hold on, please be patient", category: "routines",
    recipe: { hand: "5", hands: "both", location: "low", movement: "wiggle", face: "neutral" },
    summary: "Both open hands, palms up, one slightly ahead of the other; wiggle the fingers.",
    form: {
      handshape: "Both hands open, fingers spread, palms facing up.",
      location: "In front of your body at about waist height, one hand a little ahead of the other.",
      movement: "Wiggle the fingers of both hands.",
      face: "Calm and patient. Raise your eyebrows if you are asking, \"Can you wait?\""
    },
    classroom: [
      "Small-group help: a student raises a hand while you are still working with another group.",
      "Before a transition: students start packing up before you have finished the directions.",
      "At the door: the line needs to pause before entering the hallway."
    ],
    tip: "Get visual attention first with a small wave or a light tap on the desk, then sign WAIT while making eye contact.",
    related: ["stop", "finish", "sit", "line-up"] },
  { id: "stop", gloss: "STOP", meaning: "Stop", category: "routines",
    recipe: { hand: "flat", hands: "base", location: "neutral", movement: "down", face: "neutral" },
    summary: "Side of a flat hand chops down onto the palm of the other flat hand.",
    classroom: ["Pausing an activity right away for safety."], related: ["wait", "finish"] },
  { id: "look-at-me", gloss: "LOOK AT ME", meaning: "Look at me", category: "routines",
    recipe: { hand: "v", hands: "one", location: "eyes", movement: "toward", face: "neutral" },
    summary: "V hand points from the student toward your own eyes.",
    classroom: ["Getting attention before giving directions."], related: ["pay-attention"] },
  { id: "pay-attention", gloss: "PAY ATTENTION", meaning: "Pay attention, focus", category: "routines",
    recipe: { hand: "flat", hands: "both", location: "eyes", movement: "forward", face: "neutral" },
    summary: "Both flat hands beside the eyes, like blinders, move forward together.",
    classroom: ["Before an important direction or demonstration."], related: ["look-at-me"] },
  { id: "line-up", gloss: "LINE UP", meaning: "Line up", category: "routines",
    recipe: { hand: "4", hands: "both", location: "neutral", movement: "apart", face: "neutral" },
    summary: "Both hands with four fingers spread, one behind the other, pull apart in a line.",
    classroom: ["Going to lunch, recess, or specials."], related: ["stand", "wait"] },
  { id: "clean-up", gloss: "CLEAN UP", meaning: "Clean up", category: "routines",
    recipe: { hand: "flat", hands: "base", location: "neutral", movement: "slide", face: "neutral" },
    summary: "Flat hand wipes across the palm of the other flat hand.",
    classroom: ["End of center time.", "After an art project."], related: ["finish"] },
  { id: "start", gloss: "START", meaning: "Start, begin", category: "routines",
    recipe: { hand: "index", hands: "base", location: "neutral", movement: "twist", face: "neutral" },
    summary: "Index finger placed between the fingers of the other open hand, then twists.",
    classroom: ["Beginning a timed task."], related: ["finish", "work"] },
  { id: "finish", gloss: "FINISH", meaning: "Finished, done, all done", category: "routines",
    recipe: { hand: "5", hands: "both", location: "chest", movement: "flip", face: "neutral" },
    summary: "Both open hands, palms in, flip quickly to palms out.",
    classroom: ["Asking if a student has finished their work.", "Ending an activity."], related: ["start", "clean-up"] },
  { id: "read", gloss: "READ", meaning: "Read", category: "routines",
    recipe: { hand: "v", hands: "base", location: "neutral", movement: "down", face: "neutral" },
    summary: "V hand, like two eyes, moves down across the flat palm of the other hand.",
    classroom: ["Independent reading time."], related: ["write"] },
  { id: "write", gloss: "WRITE", meaning: "Write", category: "routines",
    recipe: { hand: "pinch", hands: "base", location: "neutral", movement: "slide", face: "neutral" },
    summary: "Pinched fingers, as if holding a pencil, move across the other palm.",
    classroom: ["Journal time.", "Writing a name on a paper."], related: ["read"] },

  /* Praise and Encouragement */
  { id: "good", gloss: "GOOD", meaning: "Good, good job", category: "praise",
    recipe: { hand: "flat", hands: "base", location: "chin", movement: "down", face: "happy" },
    summary: "Flat hand starts at the chin and moves down into the palm of the other hand.",
    classroom: ["Quick praise during work time."], related: ["wonderful", "proud"] },
  { id: "wonderful", gloss: "WONDERFUL", meaning: "Wonderful, great, amazing", category: "praise",
    recipe: { hand: "5", hands: "both", location: "high", movement: "forward", face: "excited" },
    summary: "Both open hands, palms out, push forward a little at head height.",
    classroom: ["Celebrating a big effort or a finished project."], related: ["good", "proud"] },
  { id: "correct", gloss: "CORRECT", meaning: "Correct, right", category: "praise",
    recipe: { hand: "index", hands: "base", location: "neutral", movement: "tap", face: "neutral" },
    summary: "Both index fingers point forward; the top hand taps down on the bottom hand.",
    classroom: ["Confirming an answer."], related: ["yes", "good"] },
  { id: "yes", gloss: "YES", meaning: "Yes", category: "praise",
    recipe: { hand: "s", hands: "one", location: "neutral", movement: "nod", face: "neutral" },
    summary: "A fist nods up and down at the wrist, like a head nodding.",
    classroom: ["Answering a student question."], related: ["no", "correct"] },
  { id: "no", gloss: "NO", meaning: "No", category: "praise",
    recipe: { hand: "h", hands: "one", location: "neutral", movement: "close", face: "neutral" },
    summary: "Index and middle fingers close down onto the thumb.",
    classroom: ["Answering a student question."], related: ["yes"] },
  { id: "try-again", gloss: "TRY AGAIN", meaning: "Try again", category: "praise",
    recipe: { compound: ["TRY", "AGAIN"], face: "happy" },
    summary: "Two signs together: TRY, then AGAIN.",
    classroom: ["Encouraging a student after a mistake."], related: ["again", "good"] },
  { id: "proud", gloss: "PROUD", meaning: "Proud", category: "praise",
    recipe: { hand: "thumb", hands: "one", location: "chest", movement: "up", face: "happy" },
    summary: "Thumb of a closed hand moves up the center of the chest.",
    classroom: ["Telling a student you are proud of their work."], related: ["good", "wonderful"] },
  { id: "thank-you", gloss: "THANK YOU", meaning: "Thank you", category: "praise",
    recipe: { hand: "flat", hands: "one", location: "chin", movement: "forward", face: "happy" },
    summary: "Fingertips of a flat hand start at the chin and move forward and down.",
    classroom: ["Thanking a student for helping or following directions."], related: ["please"] },

  /* Needs and Requests */
  { id: "bathroom", gloss: "BATHROOM", meaning: "Bathroom, restroom", category: "needs",
    recipe: { hand: "t", hands: "one", location: "neutral", movement: "side", face: "neutral" },
    summary: "T hand shakes slightly side to side.",
    classroom: ["A student asks to use the restroom.", "Many classrooms teach this sign to all students."], related: ["water", "please"] },
  { id: "water", gloss: "WATER", meaning: "Water, drink of water", category: "needs",
    recipe: { hand: "w", hands: "one", location: "chin", movement: "tap", face: "neutral" },
    summary: "W hand taps the chin.",
    classroom: ["A student asks for a drink."], related: ["bathroom"] },
  { id: "help", gloss: "HELP", meaning: "Help", category: "needs",
    recipe: { hand: "thumb", hands: "base", location: "neutral", movement: "up", face: "neutral" },
    summary: "Thumbs-up fist rests on the flat palm of the other hand; both lift together.",
    classroom: ["A student asks for help.", "Offering help to a student."], related: ["question", "please"] },
  { id: "question", gloss: "QUESTION", meaning: "Question, I have a question", category: "needs",
    recipe: { hand: "index", hands: "one", location: "neutral", movement: "question-mark", face: "curious" },
    summary: "Index finger draws a question mark in the air.",
    classroom: ["Checking for questions after directions."], related: ["help", "understand"] },
  { id: "understand", gloss: "UNDERSTAND", meaning: "Understand", category: "needs",
    recipe: { hand: "s", hands: "one", location: "forehead", movement: "flick", face: "neutral" },
    summary: "Closed hand near the forehead; the index finger flicks up.",
    classroom: ["Checking for understanding."], related: ["dont-understand", "question"] },
  { id: "dont-understand", gloss: "DON'T UNDERSTAND", meaning: "I don't understand", category: "needs",
    recipe: { hand: "s", hands: "one", location: "forehead", movement: "flick", face: "puzzled" },
    summary: "UNDERSTAND with a headshake and a puzzled expression.",
    classroom: ["A student needs directions again."], related: ["understand", "again"] },
  { id: "please", gloss: "PLEASE", meaning: "Please", category: "needs",
    recipe: { hand: "flat", hands: "one", location: "chest", movement: "circle", face: "neutral" },
    summary: "Flat hand circles on the chest.",
    classroom: ["Modeling polite requests."], related: ["thank-you"] },
  { id: "again", gloss: "AGAIN", meaning: "Again, repeat", category: "needs",
    recipe: { hand: "bent", hands: "base", location: "neutral", movement: "flip", face: "neutral" },
    summary: "Bent hand flips over and lands in the palm of the other hand.",
    classroom: ["Asking a student to repeat.", "Showing a sign one more time."], related: ["try-again", "slow"] },
  { id: "slow", gloss: "SLOW", meaning: "Slow, slow down", category: "needs",
    recipe: { hand: "flat", hands: "base", location: "low", movement: "slide-up", face: "neutral" },
    summary: "One hand slides slowly up the back of the other hand.",
    classroom: ["Asking someone to sign more slowly.", "Walking in the hallway."], related: ["again", "wait"] },
  { id: "sick", gloss: "SICK", meaning: "Sick, not feeling well", category: "needs",
    recipe: { hand: "middle", hands: "both", location: ["forehead", "stomach"], movement: "tap", face: "sad" },
    summary: "Middle fingers touch the forehead and the stomach at the same time.",
    classroom: ["A student does not feel well and may need the nurse."], related: ["help"] },

  /* Feelings */
  { id: "happy", gloss: "HAPPY", meaning: "Happy, glad", category: "feelings",
    recipe: { hand: "flat", hands: "one", location: "chest", movement: "brush-up", face: "happy" },
    summary: "Flat hand brushes up the chest in small circles, with a happy face.",
    classroom: ["Feelings check-in during Morning Meeting."], related: ["excited", "sad"] },
  { id: "sad", gloss: "SAD", meaning: "Sad", category: "feelings",
    recipe: { hand: "5", hands: "both", location: "face", movement: "down", face: "sad" },
    summary: "Both open hands in front of the face move down, with a sad face.",
    classroom: ["Noticing and naming a student's feeling."], related: ["happy", "sorry"] },
  { id: "angry", gloss: "ANGRY", meaning: "Angry, mad", category: "feelings",
    recipe: { hand: "claw", hands: "one", location: "face", movement: "forward", face: "angry" },
    summary: "Clawed hand in front of the face pulls out with tension.",
    classroom: ["Helping a student name a strong feeling."], related: ["frustrated", "calm"] },
  { id: "tired", gloss: "TIRED", meaning: "Tired", category: "feelings",
    recipe: { hand: "bent", hands: "both", location: "chest", movement: "down", face: "tired" },
    summary: "Fingertips of both bent hands on the chest; hands droop down.",
    classroom: ["Feelings check-in after recess."], related: ["sick"] },
  { id: "scared", gloss: "SCARED", meaning: "Scared, afraid", category: "feelings",
    recipe: { hand: "s", hands: "both", location: "chest", movement: "open", face: "scared" },
    summary: "Both closed hands open suddenly in front of the chest.",
    classroom: ["During a fire drill or a loud surprise."], related: ["calm"] },
  { id: "excited", gloss: "EXCITED", meaning: "Excited", category: "feelings",
    recipe: { hand: "middle", hands: "both", location: "chest", movement: "brush-up", face: "excited" },
    summary: "Middle fingers take turns brushing up the chest.",
    classroom: ["Before a field trip or special event."], related: ["happy"] },
  { id: "sorry", gloss: "SORRY", meaning: "Sorry", category: "feelings",
    recipe: { hand: "a", hands: "one", location: "chest", movement: "circle", face: "sad" },
    summary: "Closed hand circles on the chest.",
    classroom: ["Modeling an apology after a conflict."], related: ["sad", "please"] },
  { id: "fine", gloss: "FINE", meaning: "Fine, okay", category: "feelings",
    recipe: { hand: "5", hands: "one", location: "chest", movement: "tap", face: "neutral" },
    summary: "Thumb of an open hand taps the chest.",
    classroom: ["Answering HOW ARE YOU?"], related: ["how-are-you", "happy"] },
  { id: "frustrated", gloss: "FRUSTRATED", meaning: "Frustrated", category: "feelings",
    recipe: { hand: "flat", hands: "one", location: "chin", movement: "tap", face: "frustrated" },
    summary: "Back of a flat hand taps up against the chin.",
    classroom: ["A student is stuck on a hard problem."], related: ["angry", "help"] },
  { id: "calm", gloss: "CALM", meaning: "Calm, calm down", category: "feelings",
    recipe: { hand: "5", hands: "both", location: "neutral", movement: "down", face: "neutral" },
    summary: "Both open hands, palms down, move slowly downward.",
    classroom: ["Leading a calming moment.", "Helping a student reset."], related: ["slow", "angry"] }
];

const MODULES = [
  {
    id: 1, title: "Fingerspelling and Numbers", image: "images/hold.webp",
    blurb: "Common handshapes, the alphabet, numbers 1 to 20, and your students' names.",
    lessons: [
      { id: "handshapes", title: "Common Handshapes", type: "handshapes" },
      { id: "alphabet", title: "The Alphabet", type: "letters" },
      { id: "numbers", title: "Numbers 1 to 20", type: "numbers" },
      { id: "names", title: "Fingerspelling Names", type: "names" }
    ]
  },
  {
    id: 2, title: "Classroom Signs", image: "images/clap.webp",
    blurb: "Greetings, routines, praise, needs and feelings you will use daily.",
    lessons: [
      { id: "greetings", title: "Greetings and Attendance", type: "signs" },
      { id: "routines", title: "Directions and Routines", type: "signs" },
      { id: "praise", title: "Praise and Encouragement", type: "signs" },
      { id: "needs", title: "Needs and Requests", type: "signs" },
      { id: "feelings", title: "Feelings", type: "signs" }
    ]
  },
  {
    id: 3, title: "Deaf Culture and Classroom Practice", image: "images/read.webp",
    blurb: "Visual attention, seating, and working well with interpreters.",
    lessons: [
      { id: "culture", title: "Deaf Culture Basics", type: "text", html: `
        <p>Many Deaf people see themselves as members of a cultural and linguistic community, not as people with a loss. Writing <strong>Deaf</strong> with a capital D refers to that community. Lowercase <strong>deaf</strong> usually refers to the audiological condition.</p>
        <p><strong>ASL is its own language.</strong> It has its own grammar, word order, and use of facial expression and space. It is not English on the hands, and it is not universal: British Sign Language, for example, is a completely different language.</p>
        <p><strong>Use the words people use for themselves.</strong> Most Deaf and hard of hearing people prefer "Deaf" or "hard of hearing" over "hearing impaired." When in doubt, ask the student or family.</p>
        <p><strong>Facial expression is grammar.</strong> Raised eyebrows can mark a yes or no question. Lowered eyebrows can mark a who, what, where, why, or how question. A blank face can change the meaning of a sign.</p>` },
      { id: "attention", title: "Getting Visual Attention", type: "text", html: `
        <p>In a hearing classroom, teachers often get attention with their voice. For Deaf students, attention is visual or tactile.</p>
        <p><strong>Common, respectful ways:</strong> wave your hand in the student's line of sight, gently tap the student's shoulder, or flick the classroom lights for the whole group.</p>
        <p><strong>Wait for eye contact</strong> before you start giving directions. Directions given while a student is looking down at their work are directions they did not receive.</p>
        <p><strong>Teach the whole class</strong> the attention signal you choose, so every student learns to look up and check in.</p>` },
      { id: "seating", title: "Seating and Sightlines", type: "text", html: `
        <p>A Deaf or hard of hearing student needs to see the teacher, the interpreter, the board, and classmates who are speaking.</p>
        <p><strong>Try a semicircle or U shape</strong> for discussions, so faces are visible.</p>
        <p><strong>Avoid standing in front of a bright window.</strong> Backlighting makes your face and hands hard to see.</p>
        <p><strong>Keep the interpreter near you</strong>, so the student does not have to choose between watching you and watching the interpreter.</p>
        <p><strong>Ask the student</strong> where they can see best. Their answer may change from one activity to the next.</p>` },
      { id: "interpreters", title: "Working with Interpreters", type: "text", html: `
        <p><strong>Speak directly to the student,</strong> not to the interpreter. Say "What do you think?" rather than "Ask her what she thinks."</p>
        <p><strong>Expect a short delay.</strong> The interpreter needs a moment to process and sign. Pause before calling on students so the Deaf student has a fair chance to respond.</p>
        <p><strong>Share materials early.</strong> Lesson plans, vocabulary lists, and videos sent ahead of time help the interpreter prepare.</p>
        <p><strong>One speaker at a time.</strong> An interpreter can only interpret one voice at a time.</p>
        <p><strong>Know the role.</strong> The interpreter's job is communication access. They are not a teaching assistant, and classroom management stays with you.</p>` }
    ]
  },
  {
    id: 4, title: "Laws and Support", image: "images/hug.webp",
    blurb: "IDEA, ADA, Section 504, IEP accommodations, and Indiana resources.",
    lessons: [
      { id: "laws", title: "IDEA, ADA, and Section 504", type: "text", html: `
        <p><strong>IDEA (Individuals with Disabilities Education Act)</strong> guarantees eligible students a free appropriate public education through an Individualized Education Program (IEP). For a student who is deaf or hard of hearing, the IEP team must consider the student's language and communication needs, including opportunities for direct communication with peers and staff in the student's language and communication mode.</p>
        <p><strong>Section 504 of the Rehabilitation Act</strong> prohibits disability discrimination in programs that receive federal funds. Some students receive accommodations through a 504 plan instead of an IEP.</p>
        <p><strong>ADA (Americans with Disabilities Act), Title II</strong> requires public schools to communicate as effectively with people with disabilities as with others. This includes students and family members, for example at parent conferences.</p>
        <p class="note">[Review this summary with your program's special education faculty before publishing.]</p>` },
      { id: "iep", title: "Common IEP Accommodations", type: "text", html: `
        <p>Accommodations are chosen by the IEP or 504 team for each student. Ones you may see include:</p>
        <p><strong>Communication access:</strong> an ASL interpreter, a captioning service, or a teacher of the deaf and hard of hearing.</p>
        <p><strong>Technology:</strong> hearing aids, cochlear implants, and classroom sound systems such as an FM or DM system with a microphone the teacher wears.</p>
        <p><strong>Media:</strong> captioned videos, written directions, and visual schedules.</p>
        <p><strong>Environment:</strong> preferential seating, reduced background noise, and extra time for processing.</p>
        <p>Your job as a classroom teacher is to know your student's plan and carry it out every day.</p>` },
      { id: "indiana", title: "Indiana Resources", type: "text", html: `
        <p>[Add current Indiana resources with links, for example:]</p>
        <p><strong>Indiana School for the Deaf</strong>, Indianapolis. [Add link]</p>
        <p><strong>Indiana Deaf and Hard of Hearing Services</strong>. [Add link]</p>
        <p><strong>Indiana Department of Education, special education resources</strong>. [Add link]</p>
        <p><strong>Ball State University resources</strong> for ASL and Deaf Studies. [Add link]</p>` }
    ]
  }
];

const SCENARIOS = [
  { id: "morning-meeting", title: "Morning Meeting",
    context: "Greet each student, take attendance, and check in on feelings.",
    signs: ["good-morning", "hello", "name", "here", "how-are-you", "happy", "tired", "fine"] },
  { id: "group-work", title: "Starting Group Work",
    context: "Give directions, start the work, and check for questions.",
    signs: ["look-at-me", "pay-attention", "start", "write", "question", "help", "finish"] },
  { id: "lining-up", title: "Lining Up",
    context: "Move the class from their seats to the door.",
    signs: ["stand", "clean-up", "line-up", "wait", "slow"] },
  { id: "student-upset", title: "When a Student Is Upset",
    context: "Notice the feeling, name it, and help the student reset.",
    signs: ["sad", "angry", "frustrated", "calm", "help", "sorry"] }
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const NUMBERS = Array.from({ length: 20 }, (_, i) => i + 1);

/*
  SIGN CARD PARTS
  Handshape pictures: images/handshapes/<id>.webp (your own photos or drawings).
  Faces are drawn in code (see faceSVG in js/app.js).
  Until a picture exists, the card shows the name instead.
*/
const HANDSHAPES = {
  "flat":   { name: "Flat hand", tip: "Fingers together and straight, thumb resting against the side of the hand." },
  "5":      { name: "5 hand", tip: "All five fingers spread apart and straight." },
  "a":      { name: "A hand", tip: "A fist with the thumb resting against the side of the index finger." },
  "s":      { name: "S hand", tip: "A fist with the thumb wrapped across the front of the fingers." },
  "thumb":  { name: "Thumb up", tip: "A fist with the thumb pointing straight up." },
  "index":  { name: "Index finger", tip: "Index finger straight, other fingers closed, thumb holding them down." },
  "v":      { name: "V hand", tip: "Index and middle fingers straight and spread apart." },
  "h":      { name: "H hand", tip: "Index and middle fingers straight and together, pointing sideways." },
  "w":      { name: "W hand", tip: "Index, middle, and ring fingers straight and spread." },
  "4":      { name: "4 hand", tip: "Four fingers straight and spread, thumb folded into the palm." },
  "t":      { name: "T hand", tip: "A fist with the thumb tucked between the index and middle fingers." },
  "bent":   { name: "Bent hand", tip: "Flat hand bent at the big knuckles, fingers together." },
  "claw":   { name: "Claw hand", tip: "5 hand with all fingers curved, like holding a ball." },
  "pinch":  { name: "Pinch hand", tip: "Fingertips and thumb touching, as if holding a pencil." },
  "middle": { name: "Bent middle finger", tip: "5 hand with the middle finger bent forward." }
};

const LOCATIONS = {
  forehead: { name: "Forehead" },
  eyes:     { name: "Eyes" },
  face:     { name: "In front of the face" },
  chin:     { name: "Chin" },
  chest:    { name: "Chest" },
  stomach:  { name: "Stomach" },
  high:     { name: "Space in front, head height" },
  neutral:  { name: "Space in front, chest height" },
  low:      { name: "Space in front, waist height" }
};

const MOVEMENTS = {
  "tap":           { name: "Tap", tip: "Touch, lift, and touch again." },
  "forward":       { name: "Move forward", tip: "Move away from your body." },
  "toward":        { name: "Move toward you", tip: "Move back toward your body." },
  "down":          { name: "Move down", tip: "One clear movement downward." },
  "up":            { name: "Move up", tip: "One clear movement upward." },
  "circle":        { name: "Circle", tip: "Small circles, usually repeated." },
  "wiggle":        { name: "Wiggle fingers", tip: "Fingers flutter while the hands stay in place." },
  "side":          { name: "Shake side to side", tip: "Small, quick shake from the wrist." },
  "sweep-in":      { name: "Sweep in", tip: "Curve in toward your body." },
  "twist":         { name: "Twist", tip: "Turn the wrist." },
  "nod":           { name: "Nod", tip: "Bend at the wrist, like a head nodding." },
  "flip":          { name: "Flip over", tip: "Turn the hand over in one quick movement." },
  "brush-up":      { name: "Brush up", tip: "Brush upward on the body, often repeated." },
  "apart":         { name: "Move apart", tip: "Hands start together and move away from each other." },
  "slide":         { name: "Slide across", tip: "Slide across the other hand." },
  "slide-up":      { name: "Slide up", tip: "Slide slowly up the other hand or arm." },
  "close":         { name: "Close fingers", tip: "Fingers close or fold down, sometimes repeated." },
  "open":          { name: "Burst open", tip: "Closed hands open quickly." },
  "flick":         { name: "Flick up", tip: "A finger flicks up from a closed hand." },
  "question-mark": { name: "Draw a question mark", tip: "Trace a question mark in the air." }
};

const FACES = {
  neutral:    { name: "Neutral" },
  happy:      { name: "Happy" },
  excited:    { name: "Excited" },
  sad:        { name: "Sad" },
  tired:      { name: "Tired" },
  curious:    { name: "Asking a question" },
  puzzled:    { name: "Puzzled, shake head" },
  angry:      { name: "Angry, tense face" },
  scared:     { name: "Scared, eyes wide" },
  frustrated: { name: "Frustrated" }
};

/* Optional "See a reference video" button on each sign page.
   Leave empty ("") to keep the site fully self-contained with no outside links.
   To turn it on, put an outside dictionary address here, with {word} where the
   sign's meaning should go, for example "https://www.example.com/search/{word}". */
const REFERENCE_URL = "";

/* Short notes shown under letter and number pictures (drafts, review before publishing). */
const LETTER_NOTES = {
  G: "Point sideways.", H: "Point sideways.", J: "Draw a J with the pinky.",
  P: "Point down.", Q: "Point down.", Z: "Draw a Z with the index finger."
};
const NUMBER_NOTES = {
  1: "Palm faces you.", 2: "Palm faces you.", 3: "Palm faces you.", 4: "Palm faces you.", 5: "Palm faces you.",
  6: "Pinky touches thumb.", 7: "Ring finger touches thumb.", 8: "Middle finger touches thumb.", 9: "Index finger touches thumb.",
  10: "Thumb up, shake the wrist.",
  11: "Index flicks up off the thumb, twice.", 12: "Index and middle flick up off the thumb, twice.",
  13: "Palm faces you. Bend index and middle twice.", 14: "Palm faces you. Bend four fingers twice.",
  15: "Thumb out. Bend four fingers twice.",
  16: "6 hand, twist the wrist.", 17: "7 hand, twist the wrist.", 18: "8 hand, twist the wrist.", 19: "9 hand, twist the wrist.",
  20: "Index and thumb snap closed, twice."
};

/* Display order for handshapes (JavaScript would otherwise list "4" and "5" first). */
const HANDSHAPE_ORDER = ["flat", "5", "a", "s", "thumb", "index", "v", "h", "w", "4", "t", "bent", "claw", "pinch", "middle"];
