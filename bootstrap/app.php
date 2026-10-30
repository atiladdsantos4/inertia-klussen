<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use App\Http\Middleware\HandleInertiaRequests;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
         $middleware->web(append: [
             HandleInertiaRequests::class,
         ]);
         $middleware->preventRequestForgery (except: [
            'https://www.jemosistemas.com.br/inertia-klussen/public/index.php/auth/register',
            'https://www.jemosistemas.com.br/inertia-klussen/public/index.php/auth/login',
            'http://klussen-domain.com:8020/auth/register',
            'http://klussen-domain.com:8020/auth/login',
            'http://klussen-domain.com:8020/empresa/*',
            'https://www.klussen.com.br/inertia-klussen/public/index.php/auth/register',
            'https://www.klussen.com.br/inertia-klussen/public/index.php/auth/login'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();


    /*
    <?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
        $middleware->preventRequestForgery (except: [
            'http://jemosistemas-domain.com/inertia-klussen/auth/register',
            'http://jemosistemas-domain.com/inertia-klussen/auth/login',
            'http://jemosistemas-domain.com/inertia-klussen/empresa/*',
            'https://www.jemosistemas.com.br/inertia-klussen/public/index.php/auth/register',
            'https://www.jemosistemas.com.br/inertia-klussen/public/index.php/auth/login',
            'http://klussen-domain.com:8020/inertia-klussen/auth/register',
            'http://klussen-domain.com:8020/inertia-klussen/auth/login',
            'http://klussen-domain.com:8020/inertia-klussen/empresa/*',
            'https://www.klussen.com.br/inertia-klussen/public/index.php/auth/register',
            'https://www.klussen.com.br/inertia-klussen/public/index.php/auth/login'
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );
    })->create();

    */
