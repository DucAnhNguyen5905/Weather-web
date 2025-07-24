using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recuitment_DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class CreateJobPostJobKeywordRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PostKeyword",
                columns: table => new
                {
                    Job_Post_ID = table.Column<int>(nullable: false),
                    Job_Keywords_ID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostKeyword", x => new { x.Job_Post_ID, x.Job_Keywords_ID });

                    table.ForeignKey(
                        name: "FK_PostKeyword_JobPosts_Job_Post_ID",
                        column: x => x.Job_Post_ID,
                        principalTable: "JobPost",
                        principalColumn: "Job_Post_ID",
                        onDelete: ReferentialAction.Cascade);

                    table.ForeignKey(
                        name: "FK_PostKeyword_JobKeywords_Job_Keywords_ID",
                        column: x => x.Job_Keywords_ID,
                        principalTable: "JobKeywords",
                        principalColumn: "Job_Keywords_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostKeyword_Job_Keywords_ID",
                table: "PostKeyword",
                column: "Job_Keywords_ID");
        }



        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropTable(
                name: "PostKeyword");

        }
    }
}
