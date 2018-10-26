<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->integer('userid', true);
			$table->string('email', 64)->unique('email_UNIQUE');
			$table->timestamp('email_verified_at')->nullable();
			$table->integer('permissions');
			$table->boolean('firstlogin')->default(true);
			$table->string('password', 255);
			$table->string('name', 64)->nullable();
			$table->string('profilepic')->nullable();
			$table->string('occupation', 64)->nullable();
			$table->string('organization', 45)->nullable();
			$table->string('phone', 20)->nullable();
			$table->text('bio')->nullable();
			$table->rememberToken();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
