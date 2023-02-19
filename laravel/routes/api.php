<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PassportAuthController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

 
Route::post('register', [PassportAuthController::class, 'register'])->name('register.perform');
Route::post('login', [PassportAuthController::class, 'login'])->name('login.perform');
Route::post('/forgot-password', [PassportAuthController::class, 'forgotPassword'])->name('password.forgot');
Route::post('/reset-password', [PassportAuthController::class, 'resetPassword'])->name('password.reset');
Route::middleware('auth:api')->group(function () {
    Route::get('get-user', [PassportAuthController::class, 'userInfo'])->name('users.get');
    Route::post('logout', [PassportAuthController::class, 'logout'])->name('logout.perform');

        /**
     * roles
     */
    Route::group(['prefix' => 'roles'], function() {
        Route::post('/', [RoleController::class, 'index'])->name('roles.index');
        Route::post('/create', [RoleController::class, 'store'])->name('roles.create');
        Route::get('/{role}', [RoleController::class, 'show'])->name('roles.show');
        Route::patch('/{role}/update', [RoleController::class, 'update'])->name('roles.update');
        Route::delete('/{role}/delete', [RoleController::class, 'destroy'])->name('roles.delete');
    });

    /**
     * permissions
     */
    Route::group(['prefix' => 'permissions'], function() {
        Route::post('/', [PermissionController::class, 'index'])->name('permissions.index');
        Route::post('/create', [PermissionController::class, 'store'])->name('permissions.create');
        Route::get('/{permission}', [PermissionController::class, 'show'])->name('permissions.show');
        Route::patch('/{permission}/update', [PermissionController::class, 'update'])->name('permissions.update');
        Route::delete('/{permission}/delete', [PermissionController::class, 'destroy'])->name('permissions.delete');
    });

    /**
     * users
     */
    Route::group(['prefix' => 'users'], function() {
        Route::post('/', [UserController::class, 'index'])->name('users.index');
        Route::post('/create', [UserController::class, 'store'])->name('users.create');
        Route::get('/{user}', [UserController::class, 'show'])->name('users.show');
        Route::patch('/{user}/update', [UserController::class, 'update'])->name('users.update');
        Route::delete('/{user}/delete', [UserController::class, 'destroy'])->name('users.delete');
    });
});