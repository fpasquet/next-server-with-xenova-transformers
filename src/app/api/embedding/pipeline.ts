import { pipeline, FeatureExtractionPipeline } from '@xenova/transformers';


const createEmbeddingPipelineSingletonClass = () =>
    class EmbeddingPipelineSingleton {
        static model = 'Xenova/all-MiniLM-L6-v2';
        static instance: Promise<FeatureExtractionPipeline> | null = null;

        static async getInstance(
            progressCallback?: (progress: unknown) => void,
        ): Promise<FeatureExtractionPipeline> {
            if (this.instance === null) {
                this.instance = pipeline<'feature-extraction'>('feature-extraction', this.model, { progress_callback: progressCallback });
            }
            return this.instance;
        }
    };

declare global {
    var EmbeddingPipelineSingleton: | EmbeddingPipelineSingletonConstructor | undefined;
}

type EmbeddingPipelineSingletonConstructor = ReturnType<
    typeof createEmbeddingPipelineSingletonClass
>;

let EmbeddingPipelineSingleton: EmbeddingPipelineSingletonConstructor;

if (process.env.NODE_ENV !== 'production') {
    if (!global.EmbeddingPipelineSingleton) {
        global.EmbeddingPipelineSingleton = createEmbeddingPipelineSingletonClass();
    }
    EmbeddingPipelineSingleton = global.EmbeddingPipelineSingleton;
} else {
    EmbeddingPipelineSingleton = createEmbeddingPipelineSingletonClass();
}

export default EmbeddingPipelineSingleton;
