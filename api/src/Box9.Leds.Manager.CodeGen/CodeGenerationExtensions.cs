using System;

namespace Box9.Leds.Manager.CodeGen
{
    public static class CodeGenerationExtensions
    {
        public static string RemoveStatusCodeHandling(this string generatedCode)
        {
            /*
                Generated code by default has http status code handling:

                if (status === 200) {
                    return myClass(data);
                } else {
                    throw new Error("error_no_callback_for_the_received_http_status");
                }

                return null;

                We want to remove this and handle any errors elsewhere outside of the apiClient generated code
            */

            string result = string.Empty;
            var identifier = "if (status === 200) {";

            var start = generatedCode.IndexOf(identifier);
            var splits = generatedCode.Split(new string[] { identifier }, StringSplitOptions.RemoveEmptyEntries);

            for (var i = 0; i < splits.Length; i++)
            {
                if (i == 0)
                {
                    // This is before any occurences of the if (status ===....) condition, so return generated code as is
                    result += splits[i];
                    continue;
                }

                var startRemoval = splits[i].IndexOf('}'); // Start removal of code at closing of if statement
                var endRemoval = splits[i].IndexOf("return null;", startRemoval + 1) + 12; // End removal of code at end of return null; statement

                result += splits[i].Remove(startRemoval, endRemoval - startRemoval);
            }

            return result;
        }

        public static string WithCustomReplacements(this string generatedCode)
        {
            generatedCode = generatedCode.Replace("private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };", "private http: any");
            generatedCode = generatedCode.Replace("}).then((response) => {", "}).then((response : Response) => {");

            return generatedCode;
        }

        public static string AddReferencedTypes(this string generatedCode)
        {
            return generatedCode += @"

interface FetchOptions {
    method?: ""GET"" | ""POST"" | ""DELETE"" | ""PATCH"" | ""PUT"" | ""Options"";
    headers ?: any;
            body ?: any;
            mode ?: ""cors"" | ""no -cors"" | ""same -origin"";
            credentials ?: ""omit"" | ""same -origin"" | ""include"";
            cache ?: ""default"" | ""no -store"" | ""reload"" | ""no -cache"" | ""force -cache"" | ""only -if-cached"";
            redirect ?: ""follow"" | ""error"" | ""manual"";
            referrer ?: string;
            referrerPolicy ?: ""referrer"" | ""no-referrer-when-downgrade"" | ""origin"" | ""origin-when-cross-origin"" | ""unsafe-url"";
            integrity ?: any;
}

declare enum ResponseType {
    Basic,
    Cors,
    Default,
    Error,
    Opaque
}

interface Headers {
    append(name: string, value: string):void;
    delete(name: string):void;
    get(name: string): string;
    getAll(name: string): Array<string>;
    has(name: string): boolean;
    set(name: string, value: string): void;
}

interface Body {
    bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<JSON>;
    text(): Promise<string>;
}

interface Response extends Body {
    error(): Response;
    redirect(url: string, status?: number): Response;
	type: ResponseType;
	url: string;
	status: number;
	ok: boolean;
	statusText: string;
	headers: Headers;

    clone(): Response;
}

interface Window {
    fetch(url: string): Promise<Response>;
    fetch(url: string, options: FetchOptions): Promise<Response>;
}

interface RequestInit {
}

interface RequestInfo {
}";

        }
    }
}
