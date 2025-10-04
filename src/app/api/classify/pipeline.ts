import { pipeline, TextClassificationPipeline } from '@xenova/transformers';

// Use the Singleton pattern to enable lazy construction of the pipeline.
// NOTE: We wrap the class in a function to prevent code duplication (see below).
const createPipelineSingletonClass = () =>
  class PipelineSingleton {
    static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
    static instance: Promise<TextClassificationPipeline> | null = null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    static async getInstance(progress_callback?: Function) {
      if (this.instance === null) {
        this.instance = pipeline<'text-classification'>('text-classification', this.model, { progress_callback });
      }
      return this.instance;
    }
  };

declare global {
  var PipelineSingleton: PipelineSingletonConstructor | undefined;
}

type PipelineSingletonConstructor = ReturnType<typeof createPipelineSingletonClass>;

let PipelineSingleton: PipelineSingletonConstructor;
if (process.env.NODE_ENV !== 'production') {
  // When running in development mode, attach the pipeline to the
  // global object so that it's preserved between hot reloads.
  // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
  if (!global.PipelineSingleton) {
    global.PipelineSingleton = createPipelineSingletonClass();
  }
  PipelineSingleton = global.PipelineSingleton;
} else {
  PipelineSingleton = createPipelineSingletonClass();
}

export default PipelineSingleton;
