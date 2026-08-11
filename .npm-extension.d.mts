export function transformManifest(
    packageManifest: Record<string, unknown>,
    context: { readonly log: (message: string) => void }
): Record<string, unknown>;
