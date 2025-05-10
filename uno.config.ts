import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'

export default defineConfig({
    rules: [
    ],
    shortcuts: {
        'box-center': 'flex justify-center items-center'
        // ...
    },
    theme: {
        colors: {
            // ...
        }
    },
    presets: [
        presetUno(),
        presetAttributify(),   
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                // ...
            },
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})