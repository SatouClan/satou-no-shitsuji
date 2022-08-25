declare module "dominant-color" {
    function dominantColor(
        path: string,
        options: { format: "rgb" | "hex" },
        func: (error: Error | null, color: string | undefined) => void
    ): void

    function dominantColor(
        path: string,
        func: (error: Error | null, color: string | undefined) => void
    ): void

    export default dominantColor
}
