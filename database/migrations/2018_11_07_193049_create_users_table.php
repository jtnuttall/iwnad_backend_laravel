<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

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
			$table->string('username', 64)->unique('username_UNIQUE');
			$table->dateTime('email_verified_at')->nullable();
			$table->integer('permissions');
			$table->boolean('firstlogin')->default(1);
			$table->string('password');
			$table->string('name', 64)->nullable();
			$table->string('profilepic')->nullable();
			$table->string('occupation', 64)->nullable();
			$table->string('organization', 45)->nullable();
			$table->string('phone', 20)->nullable();
			$table->text('bio', 65535)->nullable();
			$table->text('partnernote', 65535)->nullable();
			$table->string('remember_token', 100)->nullable();
			$table->timestamps();
			$table->string('linkedin', 45)->nullable();
			$table->string('facebook', 45)->nullable();
			$table->string('instagram', 45)->nullable();
			$table->string('twitter', 45)->nullable();
			$table->text('availability', 65535)->nullable();
			$table->text('skills', 65535)->nullable();
			$table->text('interests', 65535)->nullable();
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
