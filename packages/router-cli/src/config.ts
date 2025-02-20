import path from 'path'
import { readFileSync } from 'fs'
import { z } from 'zod'

export const configSchema = z.object({
  routeFilePrefix: z.string().optional(),
  routeFileIgnorePrefix: z.string().optional().default('-'),
  routesDirectory: z.string(),
  generatedRouteTree: z.string(),
  quoteStyle: z.enum(['single', 'double']).optional().default('single'),
  future: z
    .object({
      unstable_codeSplitting: z.boolean().optional(),
    })
    .optional(),
})

export type Config = z.infer<typeof configSchema>

const configFilePathJson = path.resolve(process.cwd(), 'tsr.config.json')

export async function getConfig(): Promise<Config> {
  return configSchema.parse(
    JSON.parse(readFileSync(configFilePathJson, 'utf-8')),
  )
}
