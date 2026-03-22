import Animate from "../../utils/animations/Animate";
import { FaLocationDot } from "react-icons/fa6";

function Experience() {
  return (
    <div>
      <div className="px-4 flex flex-col justify-center items-center mt-[5vh] w-full">
        <Animate delay={300} type="slideLeft">
          <h2 className="text-4xl lg:text-[50px] font-semibold text-center">
            Training
          </h2>
        </Animate>

        {/* AI-Powered NLP Training */}
        <div className="mt-[5vh] flex flex-col gap-2 lg:w-[70vw]">
          <Animate delay={300} type="slideLeft">
            <div className="relative bg-blue-700 py-5 w-full flex flex-col lg:flex-row lg:items-center rounded-md px-6 font-semibold lg:gap-5">
              <div className="lg:text-nowrap">AI-Powered NLP Intern</div>

              <div className="font-this text-foreground/80 text-sm w-full flex items-center flex-wrap gap-2">
                <span>@</span>
                <a
                  href="https://www.algotutor.io/"
                  target="_blank"
                  className="text-primary underline"
                >
                  Algo Tutor Academy
                </a>

                {/* Location */}
                <span className="flex items-center gap-1 ml-2">
                  <FaLocationDot className="text-white text-sm" />
                  <span>Remote</span>
                </span>

                <span className="ml-2">Jun 2025 – Aug 2025</span>
              </div>
            </div>
          </Animate>

          <Animate delay={400} type="slideLeft">
            <div className="w-full px-6 py-3 bg-white rounded-md flex flex-col gap-5">
              <div className="lg:max-w-[50vw] text-black">
                • Gained strong proficiency in <strong>NLP preprocessing</strong> including
                tokenization, stemming, lemmatization, stop-word removal, and text
                normalization, ensuring clean and high-quality input data for downstream ML
                workflows. <br />
                • Implemented and compared <strong>classical ML classifiers</strong> (Naive
                Bayes, SVM, Logistic Regression) with deep learning architectures such as
                RNNs, LSTMs, and Transformers; fine-tuned state-of-the-art models like{" "}
                <strong>BERT and GPT</strong> for sentiment analysis, NER, and text
                summarization tasks. <br />
                • Built end-to-end <strong>NLP applications</strong> including chatbots,
                question-answering systems, and summarizers, optimizing performance using
                precision, recall, and F1-score — achieving{" "}
                <strong>up to 89% model accuracy</strong> through systematic hyperparameter
                tuning and evaluation.
              </div>

              <div className="flex flex-wrap flex-grow justify-between gap-3">
                <div className="py-2 px-5 rounded-full bg-blue-700">Python</div>
                <div className="py-2 px-5 rounded-full bg-blue-700">NLP</div>
                <div className="py-2 px-5 rounded-full bg-blue-700">ML/DL</div>
                <div className="py-2 px-5 rounded-full bg-blue-700">
                  BERT/GPT
                </div>
                <div className="py-2 px-5 rounded-full bg-blue-700">
                  Transformers
                </div>
              </div>
            </div>
          </Animate>
        </div>
      </div>
    </div>
  );
}

export default Experience;
