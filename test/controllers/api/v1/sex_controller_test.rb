require "test_helper"

class Api::V1::SexControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_sex_index_url
    assert_response :success
  end
end
