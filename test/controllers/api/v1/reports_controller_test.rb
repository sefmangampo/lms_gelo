require "test_helper"

class Api::V1::ReportsControllerTest < ActionDispatch::IntegrationTest
  test "should get generate" do
    get api_v1_reports_generate_url
    assert_response :success
  end
end
