<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes fadeIn {
            0% {
                opacity: 0;
                transform: translateY(-20px);
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: 0.5;
            }
        }

        .fade-in {
            animation: fadeIn 1s ease-in-out;
        }

        .pulse {
            animation: pulse 2s infinite;
        }
    </style>
</head>

<body class="bg-black text-white min-h-screen flex items-center justify-center">
    <div class="text-center py-2">
        <!-- Animated Error Code -->
        <h1 class="text-9xl font-extrabold tracking-widest fade-in">404</h1>
        <p class="text-xl mt-4 fade-in" style="animation-delay: 0.5s;">Oops! The page you're looking for doesn't exist.
        </p>

        <!-- Animated SVG -->
        <div class="mt-10">
            <svg class="w-48 h-48 mx-auto pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="white" stroke-width="4" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="white" stroke-width="2" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="white" stroke-width="2" />
            </svg>
        </div>

        <!-- Back to Home Button -->
        <div class="mt-10">
            <a href="/"
                class="relative inline-block px-6 py-3 font-medium text-white bg-black hover:bg-white hover:text-black rounded-lg group">
                <span class="absolute inset-0 w-full h-full border-2 border-white rounded-lg"></span>
                <span class="relative z-10">Go Back Home</span>
            </a>
        </div>
    </div>
</body>

</html>
