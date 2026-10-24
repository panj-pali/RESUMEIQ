const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const puppeteer = process.env.VERCEL
    ? require("puppeteer-core")
    : require("puppeteer")
const { zodToJsonSchema } = require("zod-to-json-schema");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})



const interviewReportSchema = z.object({

    matchScore: z
        .number()
        .min(0)
        .max(100)
        .describe(
            "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        ),


    technicalQuestions: z
        .array(
            z.object({

                question: z
                    .string()
                    .describe(
                        "The technical question that can be asked in the interview"
                    ),

                intention: z
                    .string()
                    .describe(
                        "The intention of interviewer behind asking this question"
                    ),

                answer: z
                    .string()
                    .describe(
                        "How to answer this question, what points to cover, what approach to take etc."
                    )

            })
        )
        .min(10)
        .describe(
            "Generate at least 10 relevant technical interview questions based on the resume, self description and job description"
        ),


    behavioralQuestions: z
        .array(
            z.object({

                question: z
                    .string()
                    .describe(
                        "The behavioral question that can be asked in the interview"
                    ),

                intention: z
                    .string()
                    .describe(
                        "The intention of interviewer behind asking this question"
                    ),

                answer: z
                    .string()
                    .describe(
                        "How to answer this question, what points to cover, what approach to take etc."
                    )

            })
        )
        .min(8)
        .describe(
            "Generate at least 8 relevant behavioral interview questions based on the candidate"
        ),


    skillGaps: z
        .array(
            z.object({

                skill: z
                    .string()
                    .describe(
                        "The skill which the candidate is lacking"
                    ),

                severity: z
                    .enum([
                        "low",
                        "medium",
                        "high"
                    ])
                    .describe(
                        "The severity of this skill gap"
                    )

            })
        )
        .describe(
            "List all relevant skill gaps in the candidate's profile"
        ),


    preparationPlan: z
        .array(
            z.object({

                day: z
                    .number()
                    .describe(
                        "The day number in the preparation plan, starting from 1"
                    ),

                focus: z
                    .string()
                    .describe(
                        "The main focus of this day in the preparation plan"
                    ),

                tasks: z
                    .array(z.string())
                    .describe(
                        "List of practical tasks to be completed on this day"
                    )

            })
        )
        .length(7)
        .describe(
            "Exactly 7 days of interview preparation plan"
        ),


    title: z
        .string()
        .describe(
            "The title of the job for which the interview report is generated"
        )

})



async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {


    const prompt = `

Generate a COMPLETE interview report for the candidate.

========================
CANDIDATE RESUME
========================

${resume}


========================
SELF DESCRIPTION
========================

${selfDescription}


========================
JOB DESCRIPTION
========================

${jobDescription}


==================================================
IMPORTANT INSTRUCTIONS
==================================================


1. TECHNICAL QUESTIONS
--------------------------------------------------

Analyze:

- Resume
- Projects
- Skills
- Technologies
- Job description
- Required technologies
- Candidate's experience

Generate ALL important and relevant technical interview questions.

Do NOT generate only 3 questions.

Generate AT LEAST 10 technical questions.

Prefer 10-15 technical questions when enough relevant information is available.

Cover different technical areas instead of repeating similar questions.

For example, if relevant, cover:

- JavaScript
- React
- Node.js
- Express
- MongoDB
- REST APIs
- Authentication
- JWT
- Databases
- Git
- Projects
- APIs
- Error handling
- Performance
- Security
- Deployment
- Data structures
- Other technologies mentioned in the resume/job description

Every technical question MUST contain:

question
intention
answer



2. BEHAVIORAL QUESTIONS
--------------------------------------------------

Generate ALL important and relevant behavioral interview questions.

Do NOT generate only 3 questions.

Generate AT LEAST 8 behavioral questions.

Prefer all questions.

Cover different behavioral areas such as:

- Tell me about yourself
- Project experience
- Difficult project
- Problem solving
- Teamwork
- Conflict
- Failure
- Mistake
- Deadline
- Pressure
- Strengths
- Weaknesses
- Learning new technology
- Career goals
- Leadership
- Communication

Every behavioral question MUST contain:

question
intention
answer



3. SKILL GAPS
--------------------------------------------------

Compare the candidate's resume with the job description.

Generate ALL meaningful skill gaps.

Do not invent skills that are unrelated to the job.

Each skill gap must contain:

skill
severity

severity must be one of:

low
medium
high



4. PREPARATION PLAN
--------------------------------------------------

Generate EXACTLY 7 DAYS.

The preparationPlan MUST contain exactly 7 objects.

The days MUST be:

Day 1
Day 2
Day 3
Day 4
Day 5
Day 6
Day 7


Suggested structure:

Day 1:
Fundamentals and core concepts

Day 2:
Technical skills required by the job

Day 3:
Project and resume preparation

Day 4:
DSA / coding practice

Day 5:
Technical interview question practice

Day 6:
Behavioral interview + resume + job description preparation

Day 7:
Mock interview + revision + final preparation


Each day MUST contain:

day
focus
tasks


Each day should contain multiple practical tasks.

DO NOT generate 3 days.

DO NOT generate 5 days.

DO NOT generate 6 days.

GENERATE EXACTLY 7 DAYS.



5. MATCH SCORE
--------------------------------------------------

Generate a match score between 0 and 100.

The score should be based on how well the candidate's resume and self description match the job description.



6. TITLE
--------------------------------------------------

Generate the appropriate job title from the job description.



==================================================
FINAL REQUIREMENT
==================================================

Return ONLY valid JSON.

The JSON MUST contain:

matchScore
technicalQuestions
behavioralQuestions
skillGaps
preparationPlan
title

Technical questions: AT LEAST 10.

Behavioral questions: AT LEAST 8.

Preparation plan: EXACTLY 7 DAYS.

Do not intentionally reduce the number of questions.
`



    const response = await ai.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: prompt,

        config: {

            responseMimeType: "application/json",

            responseJsonSchema: {

                type: "object",

                properties: {

                    matchScore: {
                        type: "number",
                        minimum: 0,
                        maximum: 100
                    },


                    technicalQuestions: {

                        type: "array",

                        minItems: 10,

                        items: {

                            type: "object",

                            properties: {

                                question: {
                                    type: "string"
                                },

                                intention: {
                                    type: "string"
                                },

                                answer: {
                                    type: "string"
                                }

                            },

                            required: [
                                "question",
                                "intention",
                                "answer"
                            ]

                        }

                    },


                    behavioralQuestions: {

                        type: "array",

                        minItems: 8,

                        items: {

                            type: "object",

                            properties: {

                                question: {
                                    type: "string"
                                },

                                intention: {
                                    type: "string"
                                },

                                answer: {
                                    type: "string"
                                }

                            },

                            required: [
                                "question",
                                "intention",
                                "answer"
                            ]

                        }

                    },


                    skillGaps: {

                        type: "array",

                        items: {

                            type: "object",

                            properties: {

                                skill: {
                                    type: "string"
                                },

                                severity: {

                                    type: "string",

                                    enum: [
                                        "low",
                                        "medium",
                                        "high"
                                    ]

                                }

                            },

                            required: [
                                "skill",
                                "severity"
                            ]

                        }

                    },


                    preparationPlan: {

                        type: "array",

                        minItems: 7,

                        maxItems: 7,

                        items: {

                            type: "object",

                            properties: {

                                day: {
                                    type: "number"
                                },

                                focus: {
                                    type: "string"
                                },

                                tasks: {

                                    type: "array",

                                    items: {
                                        type: "string"
                                    }

                                }

                            },

                            required: [
                                "day",
                                "focus",
                                "tasks"
                            ]

                        }

                    },


                    title: {
                        type: "string"
                    }

                },


                required: [

                    "matchScore",

                    "technicalQuestions",

                    "behavioralQuestions",

                    "skillGaps",

                    "preparationPlan",

                    "title"

                ]

            }

        }

    })


    // =========================
    // PARSE AI RESPONSE
    // =========================

    const report = interviewReportSchema.parse(
        JSON.parse(response.text)
    )


    // =========================
    // DEBUG
    // =========================

    console.log(
        "Technical Questions:",
        report.technicalQuestions.length
    )

    console.log(
        "Behavioral Questions:",
        report.behavioralQuestions.length
    )

    console.log(
        "Preparation Days:",
        report.preparationPlan.length
    )


    console.log(
        JSON.stringify(report, null, 2)
    )


    return report

}


async function generatePdfFromHtml(htmlContent) {
    const launchOptions = {};

    if (process.env.VERCEL) {
        const chromium = require("@sparticuz/chromium").default;
        launchOptions.args = chromium.args;
        launchOptions.executablePath = await chromium.executablePath();
        launchOptions.headless = true;
    }

    const browser = await puppeteer.launch(launchOptions);
    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "networkidle0" });

        return await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "10mm",
                bottom: "10mm",
                left: "10mm",
                right: "10mm"
            }
        });
    } finally {
        await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

   const prompt = `Generate a professional, ATS-friendly resume using the following information:

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return a JSON object with a single field "html" containing a complete HTML document.

Resume requirements:
- Tailor the resume to the job description.
- Use only information provided by the candidate. Do not invent qualifications, experience, skills, or dates.
- Keep the resume concise, professional, human-written, and ATS-friendly.
- Aim for 1-2 pages.

HTML and CSS layout requirements:
- Use a simple, single-column resume layout.
- Use Arial or a similar professional font.
- Set body margin to 0 and use compact, consistent spacing.
- Keep each section heading close to its content.
- Do not use fixed heights, large top margins, large padding, empty elements, or unnecessary blank space.
- Use margin: 0 0 8px for section headings and a small margin between entries.
- Ensure the Education heading is immediately followed by the education entries.
- Do not use justify-content: space-between on containers that stretch vertically.
- Keep education degree and dates on the same line when possible.
- For degree and date rows, use a flex container with align-items: flex-start and a small gap.
- Use min-width: 0 and flex-wrap: wrap where needed so text does not get cut off.
- Make all content fit within the printable A4 page width.
- Use box-sizing: border-box.
- Avoid absolute positioning for resume content.
- Use page-break-inside: avoid for individual education entries.
- Do not insert unnecessary page breaks.
- Include all CSS inside a style tag.
- Return valid HTML with proper opening and closing tags.
- Center-align the contact information line below the candidate's name.
- Display location, email, and phone number together on one centered line.
- Use CSS: text-align: center; for the contact information container.
- Keep the candidate's name centered above the contact line.
The final resume should look compact, balanced, readable, and professional when converted to an A4 PDF.`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer


}

module.exports = {
    generateInterviewReport,generateResumePdf,
}