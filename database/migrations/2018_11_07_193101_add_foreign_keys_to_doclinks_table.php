<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToDoclinksTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('doclinks', function(Blueprint $table)
		{
			$table->foreign('moduleid', 'fk_doclinks_modules1')->references('moduleid')->on('modules')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('doclinks', function(Blueprint $table)
		{
			$table->dropForeign('fk_doclinks_modules1');
		});
	}

}
