require "test_helper"

class Api::V1::EmploymentStatusControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_employment_status_index_url
    assert_response :success
  end
end
